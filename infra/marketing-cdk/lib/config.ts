import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const DEFAULT_EMAIL_FROM = 'MapleSpire <no-reply@maplespire.ca>'

export interface MarketingContactConfig {
  environment: 'dev' | 'staging' | 'production'
  account: string
  region: string
  allowedOrigins: string[]
  emailFrom?: string
  websiteAssetPath?: string
  domainName?: string
  domainAliases?: string[]
  certificateArn?: string
  webAclArn?: string
  applicationBaseUrl?: string
  alarmTopicArn?: string
  maximumSubmitAgeMs?: number
  throttlingRatePerSecond?: number
  throttlingBurst?: number
  retentionDays?: 14 | 30 | 90
  protectData?: boolean
}

const MAILBOX = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/

export function extractMailbox(value: string): string {
  if (/\r|\n/.test(value)) throw new Error('emailFrom must not contain line breaks')
  const bracketed = /<([^<>]+)>\s*$/.exec(value)
  const mailbox = (bracketed?.[1] ?? value).trim().toLowerCase()
  if (!MAILBOX.test(mailbox)) throw new Error('emailFrom must contain a valid email address')
  return mailbox
}

function boundedInteger(
  value: number | undefined,
  fallback: number,
  field: string,
  minimum: number,
  maximum: number,
): number {
  const resolved = value ?? fallback
  if (!Number.isInteger(resolved) || resolved < minimum || resolved > maximum) {
    throw new Error(`${field} must be an integer between ${minimum} and ${maximum}`)
  }
  return resolved
}

export type ResolvedMarketingContactConfig = MarketingContactConfig & {
  emailFrom: string
  domainAliases: string[]
  applicationBaseUrl: string
  maximumSubmitAgeMs: number
  throttlingRatePerSecond: number
  throttlingBurst: number
  retentionDays: 14 | 30 | 90
  protectData: boolean
}

export function validateConfig(input: MarketingContactConfig): ResolvedMarketingContactConfig {
  if (!['dev', 'staging', 'production'].includes(input.environment)) {
    throw new Error('environment must be dev, staging or production')
  }
  if (!/^\d{12}$/.test(input.account)) throw new Error('account must be a 12-digit AWS account id')
  if (!/^[a-z]{2}(?:-[a-z]+)+-\d$/.test(input.region)) throw new Error('region is not a valid AWS region')
  if (!Array.isArray(input.allowedOrigins) || input.allowedOrigins.length === 0 || input.allowedOrigins.length > 10) {
    throw new Error('allowedOrigins must contain between 1 and 10 origins')
  }

  const allowedOrigins = [...new Set(input.allowedOrigins.map((origin) => {
    let parsed: URL
    try {
      parsed = new URL(origin)
    } catch {
      throw new Error(`allowedOrigins contains an invalid URL: ${origin}`)
    }
    if (parsed.origin !== origin || (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost')) {
      throw new Error(`allowedOrigins must contain exact HTTPS origins (localhost HTTP is allowed in dev): ${origin}`)
    }
    if (input.environment === 'production' && parsed.protocol !== 'https:') {
      throw new Error('production allowedOrigins must use HTTPS')
    }
    return parsed.origin
  }))]

  const emailFrom = input.emailFrom ?? DEFAULT_EMAIL_FROM
  extractMailbox(emailFrom)
  const maximumSubmitAgeMs = boundedInteger(
    input.maximumSubmitAgeMs,
    86_400_000,
    'maximumSubmitAgeMs',
    60_000,
    604_800_000,
  )
  const throttlingRatePerSecond = boundedInteger(
    input.throttlingRatePerSecond,
    5,
    'throttlingRatePerSecond',
    1,
    100,
  )
  const throttlingBurst = boundedInteger(input.throttlingBurst, 10, 'throttlingBurst', 1, 200)
  if (throttlingBurst < throttlingRatePerSecond) {
    throw new Error('throttlingBurst must be at least throttlingRatePerSecond')
  }
  const retentionDays = input.retentionDays ?? (input.environment === 'production' ? 90 : 14)
  if (![14, 30, 90].includes(retentionDays)) throw new Error('retentionDays must be 14, 30 or 90')
  const protectData = input.protectData ?? (input.environment === 'production')
  if (input.environment === 'production' && !protectData) {
    throw new Error('production requires protectData=true')
  }
  if (Boolean(input.domainName) !== Boolean(input.certificateArn)) {
    throw new Error('domainName and certificateArn must be supplied together')
  }
  if (input.domainName && !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(input.domainName)) {
    throw new Error('domainName must be a valid DNS name')
  }
  if (input.domainAliases && !Array.isArray(input.domainAliases)) {
    throw new Error('domainAliases must be an array')
  }
  const domainAliases = [...new Set((input.domainAliases ?? []).map((alias) => alias.toLowerCase()))]
  if (domainAliases.length > 5) throw new Error('domainAliases must contain at most 5 DNS names')
  if (domainAliases.length > 0 && !input.domainName) {
    throw new Error('domainAliases require domainName and certificateArn')
  }
  for (const alias of domainAliases) {
    if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(alias)) {
      throw new Error(`domainAliases contains an invalid DNS name: ${alias}`)
    }
    if (alias === input.domainName?.toLowerCase()) {
      throw new Error('domainAliases must not repeat domainName')
    }
  }
  if (input.certificateArn && !/^arn:[^:]+:acm:us-east-1:\d{12}:certificate\/.+/.test(input.certificateArn)) {
    throw new Error('certificateArn must be a us-east-1 ACM certificate for CloudFront')
  }
  if (input.webAclArn) {
    const wafPrefix = `arn:aws:wafv2:us-east-1:${input.account}:global/webacl/`
    if (!input.webAclArn.startsWith(wafPrefix) || input.webAclArn.length <= wafPrefix.length) {
      throw new Error('webAclArn must reference a CloudFront-scope WebACL in us-east-1')
    }
  } else if (input.environment === 'production') {
    throw new Error('production requires webAclArn with a rate-based contact rule')
  }

  const applicationBaseUrl = input.applicationBaseUrl ?? 'https://app.maplespire.ca'
  let applicationOrigin: URL
  try {
    applicationOrigin = new URL(applicationBaseUrl)
  } catch {
    throw new Error('applicationBaseUrl must be a valid URL origin')
  }
  if (applicationOrigin.origin !== applicationBaseUrl || applicationOrigin.protocol !== 'https:') {
    throw new Error('applicationBaseUrl must be an exact HTTPS origin')
  }

  if (input.alarmTopicArn) {
    const expectedPrefix = `arn:aws:sns:${input.region}:${input.account}:`
    if (!input.alarmTopicArn.startsWith(expectedPrefix) || input.alarmTopicArn.length <= expectedPrefix.length) {
      throw new Error('alarmTopicArn must reference an SNS topic in the configured account and region')
    }
  } else if (input.environment === 'production') {
    throw new Error('production requires alarmTopicArn so delivery failures notify an operator')
  }

  return {
    ...input,
    allowedOrigins,
    emailFrom,
    domainAliases,
    applicationBaseUrl,
    maximumSubmitAgeMs,
    throttlingRatePerSecond,
    throttlingBurst,
    retentionDays,
    protectData,
  }
}

export function loadConfig(filename: string): ResolvedMarketingContactConfig {
  const absolute = resolve(process.cwd(), filename)
  return validateConfig(JSON.parse(readFileSync(absolute, 'utf8')) as MarketingContactConfig)
}

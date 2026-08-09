import { describe, expect, it } from 'vitest'
import {
  DEFAULT_EMAIL_FROM,
  extractMailbox,
  validateConfig,
  type MarketingContactConfig,
} from '../lib/config.js'

const base: MarketingContactConfig = {
  environment: 'dev',
  account: '111111111111',
  region: 'ca-central-1',
  allowedOrigins: ['https://maplespire.ca'],
}

describe('marketing contact configuration', () => {
  it('resolves conservative defaults without configuring the support destination', () => {
    expect(validateConfig(base)).toMatchObject({
      emailFrom: DEFAULT_EMAIL_FROM,
      applicationBaseUrl: 'https://app.maplespire.ca',
      maximumSubmitAgeMs: 86_400_000,
      throttlingRatePerSecond: 5,
      throttlingBurst: 10,
      retentionDays: 14,
      protectData: false,
      domainAliases: [],
    })
  })

  it('extracts the exact envelope sender used by the IAM condition', () => {
    expect(extractMailbox('MapleSpire Support <Contact@MapleSpire.ca>')).toBe('contact@maplespire.ca')
  })

  it.each([
    ['header injection', { emailFrom: 'MapleSpire <no-reply@maplespire.ca>\nBcc: attacker@example.com' }],
    ['wildcard CORS', { allowedOrigins: ['*'] }],
    ['origin with a path', { allowedOrigins: ['https://maplespire.ca/contact'] }],
    ['burst below rate', { throttlingRatePerSecond: 10, throttlingBurst: 5 }],
    ['certificate outside us-east-1', {
      domainName: 'maplespire.ca',
      certificateArn: 'arn:aws:acm:ca-central-1:111111111111:certificate/nope',
    }],
    ['alias without canonical domain', { domainAliases: ['www.maplespire.ca'] }],
    ['alias repeating canonical domain', {
      domainName: 'maplespire.ca',
      domainAliases: ['maplespire.ca'],
      certificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/test',
    }],
    ['invalid domain alias', {
      domainName: 'maplespire.ca',
      domainAliases: ['not a domain'],
      certificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/test',
    }],
    ['application URL with a path', { applicationBaseUrl: 'https://app.maplespire.ca/app' }],
    ['alarm topic in another region', {
      alarmTopicArn: 'arn:aws:sns:us-east-1:111111111111:operations',
    }],
    ['regional WAF instead of a CloudFront WebACL', {
      webAclArn: 'arn:aws:wafv2:ca-central-1:111111111111:regional/webacl/contact/id',
    }],
  ])('rejects %s', (_label, patch) => {
    expect(() => validateConfig({ ...base, ...patch })).toThrow()
  })

  it('requires HTTPS and retained resources in production', () => {
    expect(() => validateConfig({
      ...base,
      environment: 'production',
      allowedOrigins: ['http://localhost:4321'],
      protectData: true,
    })).toThrow('production allowedOrigins must use HTTPS')
    expect(() => validateConfig({ ...base, environment: 'production', protectData: false }))
      .toThrow('production requires protectData=true')
    expect(() => validateConfig({ ...base, environment: 'production', protectData: true }))
      .toThrow('production requires webAclArn')
    expect(() => validateConfig({
      ...base,
      environment: 'production',
      protectData: true,
      webAclArn: 'arn:aws:wafv2:us-east-1:111111111111:global/webacl/contact/id',
    })).toThrow('production requires alarmTopicArn')
  })
})

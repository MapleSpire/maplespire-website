import { mkdirSync, writeFileSync } from 'node:fs'

const required = [
  'AWS_ACCOUNT_ID',
  'AWS_REGION',
  'ACM_CERTIFICATE_ARN',
  'WAF_WEB_ACL_ARN',
  'ALARM_TOPIC_ARN',
]

for (const name of required) {
  if (!process.env[name]?.trim()) throw new Error(`Missing required deployment variable: ${name}`)
}

const config = {
  environment: 'production',
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION,
  allowedOrigins: ['https://maplespire.ca', 'https://www.maplespire.ca'],
  emailFrom: 'MapleSpire <no-reply@maplespire.ca>',
  websiteAssetPath: '../../website/dist',
  domainName: 'maplespire.ca',
  domainAliases: ['www.maplespire.ca'],
  certificateArn: process.env.ACM_CERTIFICATE_ARN,
  webAclArn: process.env.WAF_WEB_ACL_ARN,
  applicationBaseUrl: 'https://app.maplespire.ca',
  alarmTopicArn: process.env.ALARM_TOPIC_ARN,
  maximumSubmitAgeMs: 86_400_000,
  throttlingRatePerSecond: 5,
  throttlingBurst: 10,
  retentionDays: 90,
  protectData: true,
}

mkdirSync('infra/marketing-cdk/config', { recursive: true })
writeFileSync('infra/marketing-cdk/config/production.json', `${JSON.stringify(config, null, 2)}\n`)

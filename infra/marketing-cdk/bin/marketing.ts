#!/usr/bin/env node
import { App } from 'aws-cdk-lib'
import { MarketingContactStack } from '../lib/marketing-contact-stack.js'
import { loadConfig } from '../lib/config.js'

const app = new App()
const configFile = app.node.tryGetContext('config') as string | undefined
const config = loadConfig(configFile ?? 'config/dev.json')

new MarketingContactStack(app, `MapleSpire-Marketing-Contact-${config.environment}`, {
  env: { account: config.account, region: config.region },
  config,
  description: `MapleSpire ${config.environment} independent marketing contact service`,
})

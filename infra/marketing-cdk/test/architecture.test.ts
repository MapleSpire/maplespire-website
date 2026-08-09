import { App } from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import { describe, expect, it } from 'vitest'
import { validateConfig } from '../lib/config.js'
import { MarketingContactStack } from '../lib/marketing-contact-stack.js'

describe('independent marketing contact AWS architecture', () => {
  const config = validateConfig({
    environment: 'dev',
    account: '111111111111',
    region: 'ca-central-1',
    allowedOrigins: ['https://maplespire.ca', 'https://www.maplespire.ca'],
    emailFrom: 'MapleSpire <no-reply@maplespire.ca>',
    websiteAssetPath: 'test/fixtures/site',
    domainName: 'maplespire.ca',
    domainAliases: ['www.maplespire.ca'],
    certificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/test',
    maximumSubmitAgeMs: 86_400_000,
    throttlingRatePerSecond: 5,
    throttlingBurst: 10,
    retentionDays: 14,
    protectData: false,
    alarmTopicArn: 'arn:aws:sns:ca-central-1:111111111111:operations',
  })
  const app = new App()
  const stack = new MarketingContactStack(app, 'MarketingContactTest', {
    config,
    env: { account: config.account, region: config.region },
  })
  const template = Template.fromStack(stack)

  it('exposes exactly one throttled POST /api/contact HTTP route with bounded CORS', () => {
    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
      ProtocolType: 'HTTP',
      CorsConfiguration: {
        AllowHeaders: ['content-type'],
        AllowMethods: Match.arrayWith(['POST', 'OPTIONS']),
        AllowOrigins: ['https://maplespire.ca', 'https://www.maplespire.ca'],
      },
    })
    template.hasResourceProperties('AWS::ApiGatewayV2::Route', {
      RouteKey: 'POST /api/contact',
    })
    template.hasResourceProperties('AWS::ApiGatewayV2::Integration', {
      PayloadFormatVersion: '2.0',
    })
    template.hasResourceProperties('AWS::ApiGatewayV2::Stage', {
      AutoDeploy: true,
      DefaultRouteSettings: {
        DetailedMetricsEnabled: true,
        ThrottlingBurstLimit: 10,
        ThrottlingRateLimit: 5,
      },
      AccessLogSettings: Match.objectLike({ DestinationArn: Match.anyValue() }),
    })
  })

  it('buffers submissions in encrypted SQS with bounded retries and a DLQ', () => {
    template.resourceCountIs('AWS::SQS::Queue', 2)
    template.hasResourceProperties('AWS::SQS::Queue', {
      QueueName: 'maplespire-dev-marketing-contact-queue',
      SqsManagedSseEnabled: true,
      VisibilityTimeout: 120,
      MessageRetentionPeriod: 345600,
      RedrivePolicy: Match.objectLike({
        maxReceiveCount: 5,
        deadLetterTargetArn: Match.anyValue(),
      }),
    })
    template.hasResourceProperties('AWS::SQS::Queue', {
      QueueName: 'maplespire-dev-marketing-contact-dlq',
      SqsManagedSseEnabled: true,
      MessageRetentionPeriod: 1209600,
    })
    template.resourceCountIs('AWS::SQS::QueuePolicy', 2)
  })

  it('keeps submit and delivery Lambdas small, isolated and partially retryable', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'maplespire-dev-marketing-contact-submit',
      Runtime: 'nodejs22.x',
      Architectures: ['arm64'],
      Timeout: 10,
      Environment: {
        Variables: Match.objectLike({
          CONTACT_QUEUE_URL: Match.anyValue(),
          MAXIMUM_SUBMIT_AGE_MS: '86400000',
          ORIGIN_VERIFY_TOKEN: Match.anyValue(),
        }),
      },
    })
    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'maplespire-dev-marketing-contact-delivery',
      Runtime: 'nodejs22.x',
      Timeout: 30,
      Environment: {
        Variables: Match.objectLike({
          EMAIL_FROM: 'MapleSpire <no-reply@maplespire.ca>',
        }),
      },
    })
    const functions = template.findResources('AWS::Lambda::Function')
    const delivery = Object.values(functions).find((resource) => (
      resource.Properties?.FunctionName === 'maplespire-dev-marketing-contact-delivery'
    ))
    expect(delivery?.Properties).not.toHaveProperty('ReservedConcurrentExecutions')
    template.hasResourceProperties('AWS::Lambda::EventSourceMapping', {
      BatchSize: 1,
      FunctionResponseTypes: ['ReportBatchItemFailures'],
      ScalingConfig: { MaximumConcurrency: 2 },
    })
  })

  it('allows SES SendEmail only from the configured envelope sender', () => {
    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'ses:SendEmail',
            Effect: 'Allow',
            Resource: Match.objectLike({ 'Fn::Join': Match.anyValue() }),
            Condition: {
              StringEquals: {
                'ses:FromAddress': 'no-reply@maplespire.ca',
              },
            },
          }),
        ]),
      },
    })

    const rendered = JSON.stringify(template.toJSON())
    expect(rendered).toContain('identity/maplespire.ca')
    expect(rendered).not.toContain('SUPPORT_TO')
    expect(rendered).not.toContain('AWS_ACCESS_KEY_ID')
    expect(rendered).not.toContain('AWS_SECRET_ACCESS_KEY')
    expect(rendered).not.toContain('ses:SendRawEmail')
    expect(rendered).not.toContain('ses:*')
  })

  it('hosts static Astro output privately and forwards only the same-origin contact path', () => {
    template.resourceCountIs('AWS::SecretsManager::Secret', 1)
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: Match.anyValue(),
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: Match.objectLike({
        DefaultRootObject: 'index.html',
        Enabled: true,
        Aliases: ['maplespire.ca', 'www.maplespire.ca'],
        CustomErrorResponses: Match.arrayWith([
          Match.objectLike({ ErrorCode: 403, ResponseCode: 404, ResponsePagePath: '/404.html', ErrorCachingMinTTL: 0 }),
          Match.objectLike({ ErrorCode: 404, ResponseCode: 404, ResponsePagePath: '/404.html', ErrorCachingMinTTL: 0 }),
        ]),
        CacheBehaviors: Match.arrayWith([
          Match.objectLike({
            PathPattern: 'api/contact',
            ViewerProtocolPolicy: 'redirect-to-https',
            // CloudFront only exposes GET/HEAD, GET/HEAD/OPTIONS or the complete
            // method set. POST therefore requires ALLOW_ALL; API Gateway still
            // exposes exactly one POST route and rejects every other method.
            AllowedMethods: Match.arrayWith(['OPTIONS', 'POST']),
          }),
        ]),
        Origins: Match.arrayWith([
          Match.objectLike({
            OriginCustomHeaders: Match.arrayWith([
              Match.objectLike({ HeaderName: 'x-maplespire-origin-verify' }),
            ]),
          }),
        ]),
      }),
    })
    template.hasResourceProperties('AWS::CloudFront::Function', {
      FunctionConfig: Match.objectLike({ Runtime: 'cloudfront-js-2.0' }),
      FunctionCode: Match.stringLikeRegexp("/invite[\\s\\S]*?app\\.maplespire\\.ca[\\s\\S]*?index\\.html"),
    })
    template.resourceCountIs('AWS::CloudFront::Function', 2)
    template.hasResourceProperties('AWS::Lambda::Function', {
      MemorySize: 1024,
      Timeout: 900,
    })
  })

  it('preserves legacy application paths and query strings during the apex cutover', () => {
    const resources = template.findResources('AWS::CloudFront::Function')
    const resource = Object.values(resources).find((candidate) => (
      candidate.Properties?.FunctionCode?.includes('legacyPrefixes')
    )) as { Properties: { FunctionCode: string } }
    const handler = new Function(`${resource.Properties.FunctionCode}; return handler`)() as
      (event: {
        request: {
          uri: string
          headers: { host: { value: string } }
          querystring: Record<string, unknown>
        }
      }) => Record<string, unknown>

    const redirect = handler({
      request: {
        uri: '/invite/team-token',
        headers: { host: { value: 'maplespire.ca' } },
        querystring: { source: { value: 'old link' } },
      },
    }) as { statusCode: number; headers: { location: { value: string } } }
    expect(redirect.statusCode).toBe(302)
    expect(redirect.headers.location.value)
      .toBe('https://app.maplespire.ca/invite/team-token?source=old%20link')

    const rootRedirect = handler({
      request: {
        uri: '/',
        headers: { host: { value: 'maplespire.ca' } },
        querystring: { campaign: { value: 'launch' } },
      },
    }) as { statusCode: number; headers: { location: { value: string } } }
    expect(rootRedirect.statusCode).toBe(308)
    expect(rootRedirect.headers.location.value).toBe('/en/?campaign=launch')

    const localeRedirect = handler({
      request: { uri: '/fr', headers: { host: { value: 'maplespire.ca' } }, querystring: {} },
    }) as {
      statusCode: number
      headers: { location: { value: string } }
    }
    expect(localeRedirect.statusCode).toBe(308)
    expect(localeRedirect.headers.location.value).toBe('/fr/')

    const legalRedirect = handler({
      request: {
        uri: '/termsofservice/',
        headers: { host: { value: 'maplespire.ca' } },
        querystring: {},
      },
    }) as {
      statusCode: number
      headers: { location: { value: string } }
    }
    expect(legalRedirect.statusCode).toBe(308)
    expect(legalRedirect.headers.location.value).toBe('/en/termsofservice/')

    const wwwRedirect = handler({
      request: {
        uri: '/fr/',
        headers: { host: { value: 'www.maplespire.ca' } },
        querystring: { campaign: { value: 'launch' } },
      },
    }) as { statusCode: number; headers: { location: { value: string } } }
    expect(wwwRedirect.statusCode).toBe(308)
    expect(wwwRedirect.headers.location.value).toBe('https://maplespire.ca/fr/?campaign=launch')

    const marketingRoute = handler({
      request: { uri: '/fr/', headers: { host: { value: 'maplespire.ca' } }, querystring: {} },
    }) as { uri: string }
    expect(marketingRoute.uri).toBe('/fr/index.html')
  })

  it('gives immutable assets long cache lifetimes while revalidating HTML', () => {
    const resources = template.findResources('AWS::CloudFront::Function')
    const resource = Object.values(resources).find((candidate) => (
      candidate.Properties?.FunctionCode?.includes("response.headers['cache-control']")
    )) as { Properties: { FunctionCode: string } }
    const handler = new Function(`${resource.Properties.FunctionCode}; return handler`)() as
      (event: { request: { uri: string }; response: { headers: Record<string, { value: string }> } }) => {
        headers: Record<string, { value: string }>
      }

    const responseFor = (uri: string) => handler({ request: { uri }, response: { headers: {} } })
    expect(responseFor('/fr/index.html').headers['cache-control'])
      .toEqual({ value: 'public, max-age=0, must-revalidate' })
    expect(responseFor('/_astro/app.123.js').headers['cache-control'])
      .toEqual({ value: 'public, max-age=31536000, immutable' })
    expect(responseFor('/media/story-before.webp').headers['cache-control'])
      .toEqual({ value: 'public, max-age=2592000' })
    expect(responseFor('/sitemap-0.xml').headers['cache-control'])
      .toEqual({ value: 'public, max-age=3600' })
  })

  it('creates privacy-minimized log groups and actionable failure alarms', () => {
    template.resourceCountIs('AWS::Logs::LogGroup', 3)
    template.hasResourceProperties('AWS::Logs::LogGroup', {
      LogGroupName: '/aws/apigateway/maplespire-dev-marketing-contact',
      RetentionInDays: 14,
    })
    expect(Object.keys(template.findResources('AWS::CloudWatch::Alarm')).length).toBeGreaterThanOrEqual(7)
    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmName: 'maplespire-dev-marketing-contact-dead-letter',
      Threshold: 1,
      EvaluationPeriods: 1,
      TreatMissingData: 'notBreaching',
    })
    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmName: 'maplespire-dev-marketing-contact-queue-age',
      Threshold: 300,
    })
    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmName: 'maplespire-dev-marketing-contact-api-5xx',
      MetricName: '5xx',
      Threshold: 1,
    })
    template.hasResourceProperties('AWS::CloudWatch::Alarm', {
      AlarmActions: ['arn:aws:sns:ca-central-1:111111111111:operations'],
    })
  })

  it('retains protected data after normal deletion but cleans it up after a failed first deployment', () => {
    const protectedConfig = validateConfig({
      ...config,
      environment: 'staging',
      protectData: true,
    })
    const protectedApp = new App()
    const protectedStack = new MarketingContactStack(protectedApp, 'ProtectedMarketingContactTest', {
      config: protectedConfig,
      env: { account: protectedConfig.account, region: protectedConfig.region },
    })
    const protectedTemplate = Template.fromStack(protectedStack)

    for (const type of [
      'AWS::SecretsManager::Secret',
      'AWS::SQS::Queue',
      'AWS::Logs::LogGroup',
      'AWS::S3::Bucket',
    ]) {
      const resources = Object.values(protectedTemplate.findResources(type))
      expect(resources.length).toBeGreaterThan(0)
      for (const resource of resources) {
        expect(resource.DeletionPolicy).toBe('RetainExceptOnCreate')
        expect(resource.UpdateReplacePolicy).toBe('Retain')
      }
    }
  })
})

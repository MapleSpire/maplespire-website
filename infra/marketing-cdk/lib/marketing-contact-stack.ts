import { resolve } from 'node:path'
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  type StackProps,
} from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import { AccessLogFormat } from 'aws-cdk-lib/aws-apigateway'
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as cloudwatchActions from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as logs from 'aws-cdk-lib/aws-logs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import * as sns from 'aws-cdk-lib/aws-sns'
import * as sqs from 'aws-cdk-lib/aws-sqs'
import type { Construct } from 'constructs'
import { extractMailbox, type ResolvedMarketingContactConfig } from './config.js'

export interface MarketingContactStackProps extends StackProps {
  config: ResolvedMarketingContactConfig
}

function retention(days: 14 | 30 | 90): logs.RetentionDays {
  if (days === 14) return logs.RetentionDays.TWO_WEEKS
  if (days === 30) return logs.RetentionDays.ONE_MONTH
  return logs.RetentionDays.THREE_MONTHS
}

function alarmDefaults() {
  return {
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
  }
}

export class MarketingContactStack extends Stack {
  constructor(scope: Construct, id: string, props: MarketingContactStackProps) {
    super(scope, id, props)
    const c = props.config
    const prefix = `maplespire-${c.environment}-marketing-contact`
    // Keep production data on deliberate stack deletion/replacement, but let
    // CloudFormation clean up resources created by a failed initial deploy.
    // RETAIN would leave named queues, secrets and log groups behind after a
    // rollback, preventing the next deployment from recreating the stack.
    const keep = c.protectData
      ? RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE
      : RemovalPolicy.DESTROY
    const logRetention = retention(c.retentionDays)

    const originVerificationSecret = new secretsmanager.Secret(this, 'OriginVerificationSecret', {
      secretName: `${prefix}-origin-verification`,
      description: 'Shared only by CloudFront and the contact submit Lambda; blocks execute-api bypass.',
      generateSecretString: {
        excludePunctuation: true,
        passwordLength: 48,
      },
    })
    originVerificationSecret.applyRemovalPolicy(keep)
    // The template only ever carries a `{{resolve:secretsmanager:...}}` dynamic
    // reference, so no value is committed or synthesized here. CloudFormation
    // resolves it at deploy time into the Lambda environment and the CloudFront
    // origin header, where anyone with console read access to this account can
    // see it. That is accepted: this is a bypass marker shared between two of
    // our own components, not a credential, and it grants nothing on its own.
    // Rotating it means redeploying the stack.
    const originVerificationToken = originVerificationSecret.secretValue.unsafeUnwrap()

    const deadLetterQueue = new sqs.Queue(this, 'ContactDeadLetterQueue', {
      queueName: `${prefix}-dlq`,
      encryption: sqs.QueueEncryption.SQS_MANAGED,
      enforceSSL: true,
      retentionPeriod: Duration.days(14),
    })
    deadLetterQueue.applyRemovalPolicy(keep)

    const contactQueue = new sqs.Queue(this, 'ContactQueue', {
      queueName: `${prefix}-queue`,
      encryption: sqs.QueueEncryption.SQS_MANAGED,
      enforceSSL: true,
      retentionPeriod: Duration.days(4),
      visibilityTimeout: Duration.seconds(120),
      deadLetterQueue: {
        queue: deadLetterQueue,
        maxReceiveCount: 5,
      },
    })
    contactQueue.applyRemovalPolicy(keep)

    const submitLogs = new logs.LogGroup(this, 'SubmitLogs', {
      logGroupName: `/aws/lambda/${prefix}-submit`,
      retention: logRetention,
      removalPolicy: keep,
    })
    const deliveryLogs = new logs.LogGroup(this, 'DeliveryLogs', {
      logGroupName: `/aws/lambda/${prefix}-delivery`,
      retention: logRetention,
      removalPolicy: keep,
    })
    const apiLogs = new logs.LogGroup(this, 'ApiAccessLogs', {
      logGroupName: `/aws/apigateway/${prefix}`,
      retention: logRetention,
      removalPolicy: keep,
    })

    const sharedBundling = {
      minify: true,
      sourceMap: true,
      target: 'node22',
      bundleAwsSDK: true,
    }
    const projectRoot = process.cwd()
    const lockFile = resolve(projectRoot, 'pnpm-lock.yaml')

    const submitFunction = new NodejsFunction(this, 'ContactSubmitFunction', {
      functionName: `${prefix}-submit`,
      entry: resolve(projectRoot, 'lambda/contact-submit.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.seconds(10),
      memorySize: 256,
      tracing: lambda.Tracing.ACTIVE,
      logGroup: submitLogs,
      depsLockFilePath: lockFile,
      projectRoot,
      bundling: sharedBundling,
      environment: {
        CONTACT_QUEUE_URL: contactQueue.queueUrl,
        MAXIMUM_SUBMIT_AGE_MS: String(c.maximumSubmitAgeMs),
        ORIGIN_VERIFY_TOKEN: originVerificationToken,
      },
    })
    contactQueue.grantSendMessages(submitFunction)

    const deliveryFunction = new NodejsFunction(this, 'ContactDeliveryFunction', {
      functionName: `${prefix}-delivery`,
      entry: resolve(projectRoot, 'lambda/contact-delivery.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.seconds(30),
      memorySize: 256,
      tracing: lambda.Tracing.ACTIVE,
      logGroup: deliveryLogs,
      depsLockFilePath: lockFile,
      projectRoot,
      bundling: sharedBundling,
      environment: {
        EMAIL_FROM: c.emailFrom,
      },
    })
    deliveryFunction.addEventSource(new SqsEventSource(contactQueue, {
      batchSize: 1,
      maxConcurrency: 2,
      reportBatchItemFailures: true,
    }))
    const senderMailbox = extractMailbox(c.emailFrom)
    const senderIdentity = senderMailbox.split('@')[1]
    if (!senderIdentity) throw new Error('Configured sender has no domain identity')
    deliveryFunction.addToRolePolicy(new iam.PolicyStatement({
      sid: 'SendOnlyFromConfiguredMapleSpireIdentity',
      actions: ['ses:SendEmail'],
      resources: [this.formatArn({
        service: 'ses',
        resource: 'identity',
        resourceName: senderIdentity,
      })],
      conditions: {
        StringEquals: {
          'ses:FromAddress': senderMailbox,
        },
      },
    }))

    const integration = new HttpLambdaIntegration('ContactSubmitIntegration', submitFunction)
    const httpApi = new apigatewayv2.HttpApi(this, 'ContactHttpApi', {
      apiName: prefix,
      description: 'Independent public MapleSpire marketing contact endpoint',
      corsPreflight: {
        allowOrigins: c.allowedOrigins,
        allowHeaders: ['content-type'],
        allowMethods: [apigatewayv2.CorsHttpMethod.POST, apigatewayv2.CorsHttpMethod.OPTIONS],
        maxAge: Duration.hours(1),
      },
      createDefaultStage: false,
    })
    httpApi.addRoutes({
      path: '/api/contact',
      methods: [apigatewayv2.HttpMethod.POST],
      integration,
    })

    const stage = new apigatewayv2.HttpStage(this, 'ContactStage', {
      httpApi,
      stageName: '$default',
      autoDeploy: true,
      detailedMetricsEnabled: true,
      throttle: {
        burstLimit: c.throttlingBurst,
        rateLimit: c.throttlingRatePerSecond,
      },
      accessLogSettings: {
        destination: new apigatewayv2.LogGroupLogDestination(apiLogs),
        // No source IP, headers, body or identity fields: contact PII must never
        // enter access logs.
        format: AccessLogFormat.custom(JSON.stringify({
          requestId: '$context.requestId',
          routeKey: '$context.routeKey',
          status: '$context.status',
          responseLength: '$context.responseLength',
          responseLatency: '$context.responseLatency',
          integrationError: '$context.integrationErrorMessage',
        })),
      },
    })
    apiLogs.grantWrite(new iam.ServicePrincipal('apigateway.amazonaws.com'))

    const websiteBucket = new s3.Bucket(this, 'MarketingWebsiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: c.protectData,
      removalPolicy: keep,
      autoDeleteObjects: !c.protectData,
    })
    const websiteCertificate = c.certificateArn
      ? acm.Certificate.fromCertificateArn(this, 'MarketingWebsiteCertificate', c.certificateArn)
      : undefined
    const apiOriginRequestPolicy = new cloudfront.OriginRequestPolicy(this, 'ContactApiOriginRequestPolicy', {
      comment: 'Forward only contact CORS and content-type headers; never cookies or query strings.',
      headerBehavior: cloudfront.OriginRequestHeaderBehavior.allowList(
        'content-type',
        'origin',
        'access-control-request-headers',
        'access-control-request-method',
      ),
      cookieBehavior: cloudfront.OriginRequestCookieBehavior.none(),
      queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.none(),
    })
    const staticPathRewrite = new cloudfront.Function(this, 'StaticPathRewrite', {
      functionName: `${prefix}-static-paths`,
      comment: 'Map Astro trailing-slash locale routes to their static index documents.',
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var query = request.querystring || {};
  var parts = [];
  for (var key in query) {
    var entry = query[key];
    var values = entry.multiValue || [entry];
    for (var q = 0; q < values.length; q++) {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(values[q].value || ''));
    }
  }
  var querySuffix = parts.length ? '?' + parts.join('&') : '';
  function permanentRedirect(location) {
    return {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: {
        location: { value: location + querySuffix },
        'cache-control': { value: 'public, max-age=3600' }
      }
    };
  }
  var canonicalDomain = ${JSON.stringify(c.domainName ?? '')};
  var alternateDomains = ${JSON.stringify(c.domainAliases)};
  var host = request.headers && request.headers.host ? request.headers.host.value.toLowerCase() : '';
  if (canonicalDomain && alternateDomains.indexOf(host) !== -1) {
    return permanentRedirect('https://' + canonicalDomain + uri);
  }
  if (uri === '/') return permanentRedirect('/en/');
  if (uri === '/termsofservice' || uri === '/termsofservice/') {
    return permanentRedirect('/en/termsofservice/');
  }
  if (uri === '/privacystatement' || uri === '/privacystatement/') {
    return permanentRedirect('/en/privacystatement/');
  }
  var publishedLocales = ['fr', 'en', 'zh', 'ja', 'ko', 'hi'];
  var legalKinds = ['termsofservice', 'privacystatement'];
  for (var localeIndex = 0; localeIndex < publishedLocales.length; localeIndex++) {
    var localePath = '/' + publishedLocales[localeIndex];
    if (uri === localePath) return permanentRedirect(localePath + '/');
    for (var legalIndex = 0; legalIndex < legalKinds.length; legalIndex++) {
      var legalPath = localePath + '/' + legalKinds[legalIndex];
      if (uri === legalPath) return permanentRedirect(legalPath + '/');
    }
  }
  var legacyPrefixes = ['/app', '/login', '/invite', '/share', '/embed', '/org', '/platform', '/auth', '/api/auth'];
  for (var i = 0; i < legacyPrefixes.length; i++) {
    var prefix = legacyPrefixes[i];
    if (uri === prefix || uri.indexOf(prefix + '/') === 0) {
      return {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {
          location: { value: ${JSON.stringify(c.applicationBaseUrl)} + uri + querySuffix },
          'cache-control': { value: 'no-store' }
        }
      };
    }
  }
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else {
    var leaf = uri.substring(uri.lastIndexOf('/') + 1);
    if (leaf.indexOf('.') === -1) request.uri = uri + '/index.html';
  }
  return request;
}`),
    })
    const staticResponseHeaders = new cloudfront.Function(this, 'StaticResponseHeaders', {
      functionName: `${prefix}-static-response-headers`,
      comment: 'Apply explicit cache lifetimes to HTML and immutable marketing assets.',
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var response = event.response;
  var uri = event.request.uri;
  var cacheControl = 'public, max-age=0, must-revalidate';
  if (uri.indexOf('/_astro/') === 0) {
    cacheControl = 'public, max-age=31536000, immutable';
  } else if (uri.indexOf('/media/') === 0 || uri.indexOf('/brand/') === 0 || uri.indexOf('/social/') === 0) {
    cacheControl = 'public, max-age=2592000';
  } else if (uri === '/robots.txt' || uri === '/sitemap-index.xml' || uri === '/sitemap-0.xml') {
    cacheControl = 'public, max-age=3600';
  }
  response.headers['cache-control'] = { value: cacheControl };
  return response;
}`),
    })
    const distribution = new cloudfront.Distribution(this, 'MarketingDistribution', {
      defaultRootObject: 'index.html',
      domainNames: c.domainName ? [c.domainName, ...c.domainAliases] : undefined,
      certificate: websiteCertificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      webAclId: c.webAclArn,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: Duration.seconds(0),
        },
      ],
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
        compress: true,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: staticPathRewrite,
          },
          {
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
            function: staticResponseHeaders,
          },
        ],
      },
      additionalBehaviors: {
        'api/contact': {
          origin: new origins.HttpOrigin(
            `${httpApi.apiId}.execute-api.${this.region}.${this.urlSuffix}`,
            {
              protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
              customHeaders: {
                'x-maplespire-origin-verify': originVerificationToken,
              },
            },
          ),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: apiOriginRequestPolicy,
          compress: true,
        },
      },
    })
    if (c.websiteAssetPath) {
      new s3deploy.BucketDeployment(this, 'PublishMarketingWebsite', {
        destinationBucket: websiteBucket,
        sources: [s3deploy.Source.asset(resolve(projectRoot, c.websiteAssetPath))],
        // The AWS CLI layer can stall at its 128 MB default while unpacking and
        // copying the image-heavy landing bundle. Give the deployment provider
        // enough CPU and memory to keep production publishes bounded.
        memoryLimit: 1024,
        distribution,
        distributionPaths: ['/*'],
        prune: true,
      })
    }

    const alarms: cloudwatch.Alarm[] = []
    alarms.push(new cloudwatch.Alarm(this, 'SubmitErrorsAlarm', {
      alarmName: `${prefix}-submit-errors`,
      alarmDescription: 'Contact submissions are failing before they reach the durable queue.',
      metric: submitFunction.metricErrors({ period: Duration.minutes(5) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    }))
    alarms.push(new cloudwatch.Alarm(this, 'DeliveryErrorsAlarm', {
      alarmName: `${prefix}-delivery-errors`,
      alarmDescription: 'Queued contacts or acknowledgements are failing delivery.',
      metric: deliveryFunction.metricErrors({ period: Duration.minutes(5) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    }))
    alarms.push(new cloudwatch.Alarm(this, 'SubmitThrottlesAlarm', {
      alarmName: `${prefix}-submit-throttles`,
      alarmDescription: 'The public submit function is being throttled.',
      metric: submitFunction.metricThrottles({ period: Duration.minutes(5) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    }))
    alarms.push(new cloudwatch.Alarm(this, 'DeliveryThrottlesAlarm', {
      alarmName: `${prefix}-delivery-throttles`,
      alarmDescription: 'The contact delivery worker is being throttled.',
      metric: deliveryFunction.metricThrottles({ period: Duration.minutes(5) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    }))
    alarms.push(new cloudwatch.Alarm(this, 'ApiServerErrorsAlarm', {
      alarmName: `${prefix}-api-5xx`,
      alarmDescription: 'The public contact endpoint is returning server errors.',
      metric: stage.metricServerError({ period: Duration.minutes(5) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    }))
    alarms.push(new cloudwatch.Alarm(this, 'QueueAgeAlarm', {
      alarmName: `${prefix}-queue-age`,
      alarmDescription: 'The oldest accepted contact has waited more than five minutes.',
      metric: contactQueue.metricApproximateAgeOfOldestMessage({ period: Duration.minutes(5) }),
      threshold: 300,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      ...alarmDefaults(),
    }))
    const deadLetterAlarm = new cloudwatch.Alarm(this, 'DeadLetterQueueAlarm', {
      alarmName: `${prefix}-dead-letter`,
      alarmDescription: 'At least one contact exhausted all delivery retries.',
      metric: deadLetterQueue.metricApproximateNumberOfMessagesVisible({ period: Duration.minutes(1) }),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      ...alarmDefaults(),
    })
    alarms.push(deadLetterAlarm)

    if (c.alarmTopicArn) {
      const alarmTopic = sns.Topic.fromTopicArn(this, 'OperationsAlarmTopic', c.alarmTopicArn)
      const alarmAction = new cloudwatchActions.SnsAction(alarmTopic)
      for (const alarm of alarms) alarm.addAlarmAction(alarmAction)
    }

    new CfnOutput(this, 'MarketingWebsiteBucketName', { value: websiteBucket.bucketName })
    new CfnOutput(this, 'DistributionDomain', { value: distribution.distributionDomainName })
    new CfnOutput(this, 'ContactQueueArn', { value: contactQueue.queueArn })
    new CfnOutput(this, 'ContactDeadLetterAlarm', { value: deadLetterAlarm.alarmName })
  }
}

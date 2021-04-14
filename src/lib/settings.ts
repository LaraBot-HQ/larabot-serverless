import { Environment } from './enum'


/**
 * Core settings
 */
const settings = {
  // Global Config
  DEBUG: process.env.DEBUG,
  ENVIRONMENT: process.env.ENVIRONMENT,

  // App Config
  ASSETS_URL: '',
  REQUEST_TIMEOUT: {
    response: 10000,  // Wait 5 seconds for the server to start sending response,
    deadline: 40000, // Time limit for waiting for responses.
  },
  BOT_ENGINE_LOCAL_API_GATEWAY_URL: 'http://localhost:3000/dev/events/slack',

  /**
   * --- Chat Platforms ---
   */

  // Slack Config
  SLACK_API_URL: 'https://slack.com/api/',

  // Google Hangouts Config
  HANGOUTS_CHAT_API_URL: 'https://chat.googleapis.com/',
  GOOGLE_AUTH: {
    client_email: process.env.GAUTH_CLIENT_EMAIL,
    private_key: (process.env.GAUTH_PRIVATE_KEY)? process.env.GAUTH_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
    scopes: ['https://www.googleapis.com/auth/chat.bot']
  },

  // MSTeams Config
  MSTEAMS_CLIENT_ID: process.env.MSTEAMS_CLIENT_ID,
  MSTEAMS_CLIENT_SECRET: process.env.MSTEAMS_CLIENT_SECRET,
  MSTEAMS_BOT_ID: process.env.MSTEAMS_BOT_ID,
  MSTEAMS_BOT_SECRET: process.env.MSTEAMS_BOT_SECRET,
  MSTEAMS_BOT_NAME: process.env.MSTEAMS_BOT_NAME,
  MSTEAMS_API_URL_LOGIN: 'https://login.microsoftonline.com',

  /**
   * --- Loggers && Analytics ---
   */

  // Google Analytics Config
  GANALYTICS_TRACKING_ID: process.env.GANALYTICS_TRACKINGID,

  // Sentry Config
  SENTRY_DNS: process.env.SENTRY_DNS,

  /**
   * --- Provider Config ---
   */

  // AWS Config
  AWS_CONFIG: {},

  // DynamoDB Tables Config
  DYNAMODB_TABLE_NAME_USERCHATS: process.env.DYNAMODB_TABLE_NAME_USERCHATS,
  DYNAMODB_TABLE_NAME_CHANNELS: process.env.DYNAMODB_TABLE_NAME_CHANNELS,
  DYNAMODB_TABLE_NAME_RESPONSES: process.env.DYNAMODB_TABLE_NAME_RESPONSES,
  DYNAMODB_TABLE_NAME_CONSTANCES: process.env.DYNAMODB_TABLE_NAME_CONSTANCES,

  // SNS ARN Config
  SNS_TOPIC_ARN_SLACK: process.env.SNS_TOPIC_ARN_SLACK,
  SNS_TOPIC_ARN_HANGOUTS: process.env.SNS_TOPIC_ARN_HANGOUTS,
  SNS_TOPIC_ARN_MSTEAMS: process.env.SNS_TOPIC_ARN_MSTEAMS,

  // SQS ARN Config
  SQS_QUEUE_ARN_SLACK: process.env.SQS_QUEUE_ARN_SLACK,
  SQS_QUEUE_ARN_HANGOUTS: process.env.SQS_QUEUE_ARN_HANGOUTS,
  SQS_QUEUE_ARN_MSTEAMS: process.env.SQS_QUEUE_ARN_MSTEAMS,
}

/**
 * AWS settings should be override for local and testing environments to use a local dynamodb.
 */
if (settings.ENVIRONMENT === Environment.LOCAL || settings.ENVIRONMENT === Environment.TESTING) {
  settings.AWS_CONFIG = {
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT_URL
  }
}


export default settings
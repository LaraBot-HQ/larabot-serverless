import baseSettings from '../../../lib/settings'
import { PublisherType } from '../publisher/enum'


/**
 * Settings
 */
const settings = {
  ...baseSettings,
  // Publisher vars
  BOT_ENGINE_APIGATEWAY_URL: '',
  PUBLISHER_TYPE: PublisherType.SQS,
  BOT_ENGINE_LOCAL_API_GATEWAY_URL: 'http://localhost:3000/dev/events/slack',

  // Platforms vars
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,

  // Logger
  SENTRY_DNS: process.env.SENTRY_DNS,
}

if (['local', 'testing'].includes(`${settings.ENVIRONMENT}`)) {
  settings.BOT_ENGINE_APIGATEWAY_URL = `${process.env.BOT_FLOW_APIGATEWAY_URL}`
  settings.PUBLISHER_TYPE = PublisherType.HTTP
}

export default settings
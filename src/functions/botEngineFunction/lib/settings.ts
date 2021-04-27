import baseSettings from "../../../lib/settings"


/**
 * Settings
 */
const settings = {
  ...baseSettings,

  // Logger
  SENTRY_DNS: process.env.SENTRY_DNS,
}

export default settings
import settings from './settings'
import * as Sentry from '@sentry/node'
import { Environment } from './enum'


/**
 * Logger service is responsible of helps with debugging
 * and error handling using Sentry
 * @see {@link https://docs.sentry.io/platforms/javascript/}
 */
class Logger {
  static sentryDNS: string | undefined = settings.SENTRY_DNS

  static initErrorLogger(): void {
    if (this.sentryDNS) {
      Sentry.init({
        dsn: settings.SENTRY_DNS,
        environment: settings.ENVIRONMENT
      })
    }
  }

  /**
   * Allow set global information about current user
   * @see {@link https://docs.sentry.io/enriching-error-data/context/?platform=javascript#capturing-the-user}
   */
  static setUserContext(externalId: string | null, id?: number | string, email?: string, username?: string, ip_address?: string): void {
    let userExternalId: string = `Ext: ${externalId}`
    if (id) {
      userExternalId = `${id} (${userExternalId})`
    }
    Sentry.configureScope(scope => {
      scope.setUser({
        id: userExternalId,
        username: username,
        email: email,
        ip_address: ip_address,
      })
    })
  }

  /**
   * Allow set global extra data as key/value pairs of data
   * @see {@link https://docs.sentry.io/enriching-error-data/context/?platform=javascript#extra-context}
   */
  static setExtraContext(data: { [extra: string]: any }): void {
    if (typeof data !== 'object') {
      return
    }
    Sentry.configureScope(scope => {
      let keysToIgnore: Array<string> = ['userExternalId']
      let keys: Array<string> = Object.keys(data)
      keys.forEach((key: string) => {
        if (!keysToIgnore.includes(key) && typeof data[key] !== 'object') {
          scope.setExtra(key, data[key])
        }
      })
    })
  }

  static setExtraContextFullObject(contextKey: string, data: { [extra: string]: any }): void {
    let context: { [extra: string]: any } = {}
    context[contextKey] = JSON.stringify(data, null, 2)
    Logger.setExtraContext(context)
  }

  /**
   * Allow set global tags data as key/value pairs of data
   * assigned to events that can be used for breaking down issues
   * or quick access to finding related events.
   * @see {@link https://docs.sentry.io/enriching-error-data/context/?platform=javascript#tagging-events}
   */
  static setTagContext(data: { [tag: string]: number | string }): void {
    Sentry.configureScope(scope => {
      let keys: Array<string> = Object.keys(data)
      keys.forEach((key: string) => {
        scope.setTag(key, `${data[key]}`)
      })
    })
  }

  static log(...data: any): void {
    if (this.isDebug()) {
      data.forEach((info: any) => {
        if (typeof info === 'object') {
          console.log(JSON.stringify(info, null, 2))
        } else {
          console.log(info)
        }
      })
    }
  }

  static logText(data: any): string {
    return JSON.stringify(data, null, 2)
  }

  static logProduction(...data: any): void {
    if (Logger.isProduction()) {
      Logger.log(data)
    }
  }

  static logError(context: any, ...data: any): void {
    if (this.isDebug() || this.isProduction()) {
      let errors: string = ''
      data.forEach((info: any) => {
        if (info instanceof Error) {
          errors += info.toString()
        } else if (typeof info === 'object') {
          errors += JSON.stringify(info)
        } else {
          errors += info
        }
        errors += ' '
        console.error(errors)

        // Send sentry error notification
        if (settings.SENTRY_DNS && !Logger.isString(info)) {
          Sentry.withScope(scope => {
            if (Logger.isObject(context)) {
              if (Array.isArray(context.tags)) {
                context.tags.forEach((tag: any) => {
                  for (const key in tag) {
                    scope.setTag(key, tag[key])
                  }
                })
              }
              if (Logger.isObject(context.user)) {
                scope.setUser(context.user)
              }
            }
            if (!(info instanceof Error)) {
              info = new Error(JSON.stringify(info))
            }
            Sentry.captureException(info)
          })
        }
      })
      // ganalytics.trackEvent(null, 'Bot Failed', 'Bot Exception', errors)
    }
  }

  static logDivider(text: string): void {
    if (this.isDebug()) {
      console.log('\n ############### ' + text + ' ############### \n')
    }
  }

  static logInit(): void {
    this.logDivider('Handle Request')
  }

  static logEnd(): void {
    if (this.isDebug()) {
      this.logDivider('End Request')
      console.log('        （ ^_^）RESPONSE（^_^ ）        ')
      console.log('                   ⮟                  \n')
    }
  }

  static isDebug(): boolean {
    return settings.DEBUG === 'true'
  }

  static isProduction(): boolean {
    const environment: Environment = settings.ENVIRONMENT as Environment
    return ![Environment.LOCAL, Environment.TESTING].includes(environment)
  }

  static isObject(value: any): boolean {
    return value && typeof value === 'object' && value.constructor === Object
  }

  static isString (value: any): boolean {
    return typeof value === 'string' || value instanceof String
  }
}

export default Logger


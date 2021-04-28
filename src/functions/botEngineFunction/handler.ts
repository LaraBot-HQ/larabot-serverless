import { ChatPlatformEType } from '../../lib/enum'
import Logger from '../../lib/logger'


export const handlerBotEngine = async (platform: ChatPlatformEType, event: any, context: any) => {
  console.log(`Request arrived by platform: ${platform} ...`)
  console.log(event.body)
  Logger.initErrorLogger()
  // try {
  //   let eventMessage: any = event
  //   // Checks if data is coming from SNS
  //   if (eventMessage['Records'] && eventMessage.Records[0].Sns) {
  //     eventMessage = JSON.parse(event.Records[0].Sns.Message)
  //   }

  //   Logger.logProduction('--- Request Received: ----', eventMessage)

  // return await ProcessEvent.userInteraction(eventMessage, callback)

  //   if (context) { context.succeed('200 OK') }
  // } catch (error) {
  //   Logger.logError({}, error)
  //   if (callback) { callback(error) }
  //   return error
  // }
  return event.body
}
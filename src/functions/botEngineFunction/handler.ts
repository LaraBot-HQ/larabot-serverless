import { ChatPlatformEType } from '../../lib/enum'


export const handlerBotEngine = async (platform: ChatPlatformEType, event: any, context: any) => {
  console.log(`Request arrived by platform: ${platform} ...`)
  const body = JSON.parse(event.body)
  return body
}
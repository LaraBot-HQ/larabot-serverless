import { ChatPlatformEType } from "../../lib/enum"
import BaseApiGateway from "./botApiGateway/baseBotApiGateway"
import BotApiGatewayRegistry from "./botApiGateway/factory"


export const handlerBotApiGateway = async (platform: ChatPlatformEType, event: any, context: any) => {
  console.log(`Request arrived by platform: ${platform} ...`)
  const slackListener: BaseApiGateway = new BotApiGatewayRegistry[platform]()
  return await slackListener.processEvent(event)
}
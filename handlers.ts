import { handlerBotApiGateway } from './src/functions/botApiGatewayFunction/handler'
import { handlerBotEngine } from './src/functions/botEngineFunction/handler'
import { ChatPlatformEType } from './src/lib/enum'
import FunctionHandlerFactory from './src/lib/handler/factory'

/**
 * Function for: Bot Api Gateway
 */
export const botApiGatewaySlack = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.SLACK](handlerBotApiGateway).processHandler(event, context, callback)
}
export const botApiGatewayGChat = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.GCHAT](handlerBotApiGateway).processHandler(event, context, callback)
}
export const botApiGatewayMSTeams = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.MSTEAMS](handlerBotApiGateway).processHandler(event, context, callback)
}

/**
 * Function for: Bot Engine
 */
export const botEngineSlack = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.SLACK](handlerBotEngine).processHandler(event, context, callback)
}
export const botEngineGChat = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.GCHAT](handlerBotEngine).processHandler(event, context, callback)
}
export const botEngineMSTeams = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerFactory[ChatPlatformEType.MSTEAMS](handlerBotEngine).processHandler(event, context, callback)
}
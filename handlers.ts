import { handlerBotApiGateway } from './src/functions/botApiGatewayFunction/handler'
import { handlerBotEngine } from './src/functions/botEngineFunction/handler'
import { ChatPlatformEType } from './src/lib/enum'
import FunctionHandlerRegistry from './src/lib/handler/registry'

/**
 * Function for: Bot Api Gateway
 */
export const botApiGatewaySlack = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.SLACK](handlerBotApiGateway).processHandler(event, context, callback)
}
export const botApiGatewayHangouts = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.HANGOUTS](handlerBotApiGateway).processHandler(event, context, callback)
}
export const botApiGatewayMSTeams = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.MSTEAMS](handlerBotApiGateway).processHandler(event, context, callback)
}

/**
 * Function for: Bot Engine
 */
export const botEngineSlack = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.SLACK](handlerBotEngine).processHandler(event, context, callback)
}
export const botEngineHangouts = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.HANGOUTS](handlerBotEngine).processHandler(event, context, callback)
}
export const botEngineMSTeams = async (event: any, context: any, callback: any) => {
  return await new FunctionHandlerRegistry[ChatPlatformEType.MSTEAMS](handlerBotEngine).processHandler(event, context, callback)
}
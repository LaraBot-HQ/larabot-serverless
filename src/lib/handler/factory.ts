import { ChatPlatformFactoryType } from '../type'
import { GChatHandler, MSTeamsHandler, SlackHandler } from './handler'

const FunctionHandlerFactory: ChatPlatformFactoryType = {
  slack: SlackHandler,
  gchat: GChatHandler,
  msteams: MSTeamsHandler
}

export default FunctionHandlerFactory
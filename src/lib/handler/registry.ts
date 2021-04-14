import { ChatPlatformRegistryType } from '../type'
import { HangoutsHandler, MSTeamsHandler, SlackHandler } from './handler'

const FunctionHandlerRegistry: ChatPlatformRegistryType = {
  slack: SlackHandler,
  hangouts: HangoutsHandler,
  msteams: MSTeamsHandler
}

export default FunctionHandlerRegistry
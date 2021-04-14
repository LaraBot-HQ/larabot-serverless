import { ChatPlatformRegistryType } from '../type'
import { HangoutsHandler, MSTeamsHandler, SlackHandler } from './handler'

const BotApiGatewayRegistry: ChatPlatformRegistryType = {
  slack: SlackBotApiGateway,
  hangouts: HangoutsBotApiGateway,
  msteams: MSTeamsBotApiGateway
}

export default BotApiGatewayRegistry
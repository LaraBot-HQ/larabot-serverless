import { ChatPlatformFactoryType } from '../../../lib/type'
import GChatApiGateway from './factories/gchatBotApiGateway'
import MSTeamsApiGateway from './factories/msteamsBotApiGateway'
import SlackApiGateway from './factories/slackBotApiGateway'


const BotApiGatewayRegistry: ChatPlatformFactoryType = {
  slack: SlackApiGateway,
  gchat: GChatApiGateway,
  msteams: MSTeamsApiGateway
}

export default BotApiGatewayRegistry
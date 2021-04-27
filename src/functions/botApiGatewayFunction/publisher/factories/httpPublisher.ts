import APISender from '../../../../lib/api/apiSender'
import { HTTPMethod } from '../../../../lib/api/enum'
import { ChatPlatformEType } from '../../../../lib/enum'
import Logger from '../../../../lib/logger'
import { MessagePayload, ObjectType } from '../../../../lib/type'
import settings from '../../lib/settings'
import BasePublisher from '../basePublisher'


class HttpPublisher extends BasePublisher {

  constructor(platform: ChatPlatformEType) {
    super(platform)
    this.sender = APISender
    this.senderURI = `${settings.BOT_ENGINE_LOCAL_API_GATEWAY_URL}`
  }

  public async publish(requestBody: ObjectType): Promise<ObjectType> {
    Logger.log('> Sending message to BotEngine local api...')

    let messagePayload: MessagePayload = {
      chatEvent: true,
      platform: this.platform,
      body: requestBody,
    }
    console.log('#################')
    console.log(messagePayload)
    await this.sender.send(HTTPMethod.POST, this.senderURI, messagePayload)

    return { status: '200 OK' }
  }
}

export default HttpPublisher
// import APISender from '../../../../lib/api/apiSender'
// import { HTTPMethod } from '../../../../lib/api/enum'
// import { ChatPlatformEType } from '../../../../lib/enum'
// import Logger from '../../../../lib/logger'
// import settings from '../../../../lib/settings'
// import { MessagePayload } from '../../../../lib/type'
// import BasePublisher from '../basePublisher'


// class HttpPublisher extends BasePublisher {

//   constructor(platform: ChatPlatformEType) {
//     super(platform)
//     this.sender = APISender
//     this.senderURI = settings.BOT_ENGINE_LOCAL_API_GATEWAY_URL
//   }

//   public async publish(requestBody:any): Promise<any> {
//     await super.publish(requestBody)

//     Logger.log('> Sending message to BotEngine local api...')

//     let messagePayload: MessagePayload = {
//       chatEvent: true,
//       platform: this.platform,
//       body: requestBody
//     }
//     await this.sender.send(HTTPMethod.POST, this.senderURI, { body: JSON.stringify(messagePayload) })

//     return { status: '200 OK' }
//   }
// }

// export default HttpPublisher
// import { ChatPlatformEType } from '../../../lib/enum'


// abstract class BaseBotApiGateway {
//   protected platform: ChatPlatformEType
//   protected sqsQueue: BasePublisher

//   constructor(platform: ChatPlatformEType) {
//     this.platform = platform
//     this.sqsQueue = new PublisherRegistry[settings.PUBLISHER_TYPE](this.platform)
//   }

//   public abstract async processEvent(request: any): Promise<object>
//   public abstract validateRequest(request: any): boolean
//   public abstract shouldProcessRequest(request: any): boolean
// }

// export default BaseBotApiGateway
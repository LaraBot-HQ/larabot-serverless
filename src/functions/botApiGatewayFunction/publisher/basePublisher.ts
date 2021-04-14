// import { ChatPlatformEType } from '../../../lib/enum'
// import { ObjectType } from '../../../lib/type'


// abstract class BasePublisher {
//   protected platform: ChatPlatformEType
//   protected sender: any
//   protected senderURI: string

//   constructor(platform: ChatPlatformEType) {
//     this.platform = platform
//   }

//   async publish(requestBody: ObjectType): Promise<boolean> {
//     if (!this.platform || typeof(this.platform) !== 'string') {
//       throw new Error('Platform is required and must be a String')
//     }

//     if (!requestBody && Object.keys(requestBody).length !== 0) {
//       throw new Error('Request body is required')
//     }
//     return true
//   }
// }

// export default BasePublisher
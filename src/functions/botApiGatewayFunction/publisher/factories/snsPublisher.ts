// import AWS from 'aws-sdk'
// import { ChatPlatformEType } from '../../../../lib/enum'
// import Logger from '../../../../lib/logger'
// import settings from '../../../../lib/settings'
// import { ChatPlatformRegistryType, MessagePayload } from '../../../../lib/type'
// import BasePublisher from '../basePublisher'


// const SnsTopicArnRegistry: ChatPlatformRegistryType = {
//   slack: settings.SNS_TOPIC_ARN_SLACK,
//   gchat: settings.SNS_TOPIC_ARN_GCHAT,
//   msteams: settings.SNS_TOPIC_ARN_MSTEAMS,
// }


// class SNSPublisher extends BasePublisher {
//   private snsTopicArn: string

//   constructor(platform: ChatPlatformEType) {
//     super(platform)
//     this.sender = new AWS.SNS({ apiVersion: '2010-03-31' })
//     this.senderURI = SnsTopicArnRegistry[platform]
//     AWS.config.update({ region: process.env.PROVIDER_REGION });
//   }

//   public async publish(requestBody: any): Promise<any> {
//     await super.publish(requestBody)

//     Logger.log('> Sending message to aws SNS...')
//     const messagePayload: MessagePayload = {
//       chatEvent: true,
//       platform: this.platform,
//       body: requestBody
//     }

//     const params = {
//       Message: JSON.stringify(messagePayload),
//       TopicArn: this.snsTopicArn
//     }

//     // Create promise with SNS service object
//     const senderPromise = this.sender.publish(params).promise()
//     return await senderPromise.then(
//       (data: any) => {
//         return { status: '200 OK' }
//       }).catch((err: any) => {
//         Logger.log(err)
//         return { status: 'Not Good' }
//       })
//   }
// }

// export default SNSPublisher
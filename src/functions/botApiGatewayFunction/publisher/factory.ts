import HttpPublisher from './factories/httpPublisher'
import SNSPublisher from './factories/snsPublisher'
import SQSPublisher from './factories/sqsPublisher'
import { PublisherFactoryType } from './type'


const PublisherFactory: PublisherFactoryType = {
  http: HttpPublisher,
  sns: SNSPublisher,
  sqs: SQSPublisher,
}

export default PublisherFactory
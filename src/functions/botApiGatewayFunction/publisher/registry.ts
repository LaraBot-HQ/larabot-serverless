import { PublisherRegistryType } from './type'


const PublisherRegistry: PublisherRegistryType = {
  http: HttpPublisher,
  sns: SNSPublisher,
  sqs: SQSPublisher,
}

export default PublisherRegistry
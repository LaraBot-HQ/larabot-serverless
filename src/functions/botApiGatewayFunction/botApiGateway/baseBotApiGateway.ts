import { ChatPlatformEType } from '../../../lib/enum'
import { ObjectType } from '../../../lib/type'
import settings from '../lib/settings'
import BasePublisher from '../publisher/basePublisher'
import PublisherFactory from '../publisher/factory'


abstract class BaseApiGateway {
  protected platform: ChatPlatformEType
  protected snsPublisher: BasePublisher

  constructor(platform: ChatPlatformEType) {
    this.platform = platform
    this.snsPublisher = new PublisherFactory[settings.PUBLISHER_TYPE](this.platform)
  }

  public abstract processEvent(request: any): Promise<ObjectType | string>
  public abstract validateRequest(request: any): boolean
  public abstract shouldProcessRequest(request: any): boolean
}

export default BaseApiGateway
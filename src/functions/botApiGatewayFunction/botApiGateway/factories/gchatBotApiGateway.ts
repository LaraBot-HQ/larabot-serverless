import BaseApiGateway from '../baseBotApiGateway'
import { ChatPlatformEType } from '../../../../lib/enum'
import { ObjectType } from '../../../../lib/type'


class GChatApiGateway extends BaseApiGateway {
  protected platform: ChatPlatformEType

  constructor() {
    super(ChatPlatformEType.GCHAT)
  }

  public async processEvent(request: any): Promise<ObjectType | string> {
    return {}
  }

  public validateRequest(request: any): boolean {
    return true
  }

  public shouldProcessRequest(request: any): boolean {
    return true
  }
}

export default GChatApiGateway
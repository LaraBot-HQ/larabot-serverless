import { ChatPlatformEType, ChatPlatformETypeFullName } from '../enum'
import Logger from '../logger'


abstract class BaseHandler {
  protected platform: ChatPlatformEType
  public handler: any

  constructor(platform: ChatPlatformEType, handler: any) {
    this.platform = platform
    this.handler = handler
  }

  public async processHandler(event: any, context: any, callback: any): Promise<void> {
    Logger.log(`> New event from "${ChatPlatformETypeFullName[this.platform]}" received...`)
    await this.handler(this.platform, event, context, callback)
  }
}


export class SlackHandler extends BaseHandler {
  constructor(handler: any) {
    super(ChatPlatformEType.SLACK, handler)
  }
}


export class GChatHandler extends BaseHandler {
  constructor(handler: any) {
    super(ChatPlatformEType.GCHAT, handler)
  }
}


export class MSTeamsHandler extends BaseHandler {
  constructor(handler: any) {
    super(ChatPlatformEType.MSTEAMS, handler)
  }
}
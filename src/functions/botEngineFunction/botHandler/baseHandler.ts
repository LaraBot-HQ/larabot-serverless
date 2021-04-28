import { ChatPlatformEType, ChatPlatformETypeName } from "../../../lib/enum"
import Logger from "../../../lib/logger"
import BaseBotEngine from "../botEngine/baseBotEngine"
import { HandleResponseType } from "./type.d/type"


abstract class BaseHandler {
  public platform: ChatPlatformEType
  protected botEngine: BaseBotEngine
  protected handleResponse: HandleResponseType
  protected localeKey: string
  protected intentsToHandle: Array<string> | null
  protected intentsToIgnore: Array<string> | null
  protected handleResponseIsSync: boolean

  public constructor(botEngine: BaseBotEngine) {
    this.platform = botEngine.platform
    this.botEngine = botEngine
    this.handleResponse = null
    this.intentsToHandle = null
    this.intentsToIgnore = null
    this.handleResponseIsSync = false
  }

  public canHandle(): boolean {
    let shouldHandle = false
    if (this.intentsToHandle !== null) {
      shouldHandle = this.intentsToHandle.includes(this.botEngine.event.intent)
    }
    if (this.intentsToIgnore !== null) {
      shouldHandle = !this.intentsToIgnore.includes(this.botEngine.event.intent)
    }
    return shouldHandle
  }

  private logger(): void {
    const handlerName: string = this.getHandlerName(false)
    Logger.setTagContext({
      handlerName: handlerName,
    })
    Logger.log(`> Processing handler for "${ChatPlatformETypeName[this.platform]}" platform:`)
    Logger.log(`> Handler --> ${handlerName}...`)
    Logger.log('---')
  }

  public async run(): Promise<any> {
    this.logger()

    await this.handle()
    await this.replyMessage()
    await this.afterHandle()
  }

  public async replyMessage() {
    if (this.handleResponse) {
      this.botEngine.setResponse(this.handleResponse, this.handleResponseIsSync)
    }
    if (this.botEngine.hasResponse()) {
      await this.botEngine.replyMessage()
    }
  }

  protected async handle(): Promise<any> {
    throw new Error(`This method is not implemented yet by this platform: ${this.platform}.`)
  }
  protected async afterHandle(): Promise<void> {}

  public getHandlerName(getBaseName: boolean = false): string {
    let handlerName: string = this.constructor.name
    if (getBaseName) {
      handlerName = handlerName.replace(ChatPlatformETypeName[this.platform], '')
    }
    return handlerName
  }

  public getHandlerLocaleKey(): string {
    let handlerLocaleKey: string = this.getHandlerName(true)
    return handlerLocaleKey.replace('Handler', '')
  }

  public getLocaleKey(localePath?: string): string {
    let localePrefix: string = 'handlers'
    localePrefix = `${localePrefix}.${this.getHandlerLocaleKey()}`
    if (localePath) {
      localePrefix = `${localePrefix}.${localePath}`
    }
    return localePrefix
  }
}

export default BaseHandler
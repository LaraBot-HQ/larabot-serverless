import { ChatPlatformEType } from '../../../lib/enum'
import { Class } from '../../../lib/type'
import BaseHandler from '../botHandler/baseHandler'
import { UserContextType } from './type'


abstract class BaseBotEngine {
  private handlers: Array<Class<BaseHandler>>
  public platform: ChatPlatformEType
  public userContext: UserContextType
  public responseMaker: BaseResponseMaker
  public chatInterface: BaseChatInterface
  public botEventParser: BaseBotEventParser
  public event: BotEventType
  public originalEvent: any
  public response: HandleResponseType
  public responseIsSync: boolean
  public threadedResponse: any
  // public contextManager: ContextManagerType

  public constructor(platform: ChatPlatformEType) {
    this.platform = platform
    this.userRequireOnboarding = false
    this.api = new DailyBotAPI(this)
    this.chatInterface = new ChatInterfaceRegistry[this.platform](this)
    this.responseMaker = new ResponseMakerRegistry[this.platform](Language.ENGLISH, this)
    this.botEventParser = new BotEventParserRegistry[this.platform]()
    this.handlers = []
    this.responseIsSync = false
    this.shouldFetchEnvironment = true
    this.shouldFetchContext = true
    this.responsePersistance = new ResponseDynamoDBStorage()
    this.contextManager = {
      userchat: new UserChatContextManager(),
      channel: null,
      response: null,
      constance: ConstanceContextManagerSingleton.getInstance(),
    }
  }

  async process(event: any, preBuiltEvent?: BotEventType) {
    if (!this.originalEvent) {
      this.originalEvent = event? event : preBuiltEvent
    }
    Logger.setExtraContextFullObject('originalEvent', this.originalEvent)
    if (preBuiltEvent) {
      this.event = preBuiltEvent
    } else {
      this.event = this.botEventParser.parseChatEvent(event)
    }

    Logger.log('> Parsed Event:', this.event)
    this.initContext()

    if (this.shouldFetchEnvironment) {
      await this.fetchDailyBotEnvironment()
    }

    if (this.shouldFetchContext) {
      await this.fetchContext()
    }

    await this.beforeRun()
    return await this.run()
  }

  public setHandlers(handlersRegistry: Array<ChatPlatformRegistryType>): void {
    handlersRegistry.forEach((registry) => {
      this.handlers.push(registry[this.platform])
    })
  }

  protected async beforeRun(): Promise<void> {}

  public async run(): Promise<{ handledBy: string }> {
    for (const index in this.handlers) {
      if (!this.handlers[index]) {
        continue
      }

      const handler: BaseHandler = new this.handlers[index](this)
      if (handler.canHandle()) {
        await handler.run()
        return { handledBy: handler.getHandlerName(false) }
      }
    }

    return { handledBy: 'No one' }
  }

  public setResponse(response: HandleResponseType, isSync: boolean = false) {
    this.response = response
    this.responseIsSync = isSync
  }

  public hasResponse(): boolean {
    if (this.response) {
      if (Array.isArray(this.response) && this.response.length) {
        return true
      } else {
        return Boolean((this.response as ResponseDataType).text || (this.response as ResponseDataType).richText)
      }
    }
    return false
  }

  public async respond(): Promise<any> {
    Logger.log('> Bot Responding...')

    let responses: Array<ResponseDataType>
    if (Array.isArray(this.response)) {
      responses = this.response
    } else {
      responses = [this.response as ResponseDataType]
    }

    let channel: ResponseChannelType = {
      id: this.event.channel,
      isChannelMessage: this.event.isChannelMessage,
      thread: this.event.thread!
    }
    let asyncWorkerType = (this.responseIsSync)? eachSeries.bind(flow): each.bind(flow)
    await asyncWorkerType(responses, async (response: ResponseDataType, callback: ErrorCallback) => {
      try {
        if (response.channel) {
          channel = response.channel!
        }
        let responseData: BaseResponseDataType = {
          text: response.text,
          richText: response.richText,
          metadata: response.metadata,
        }
        await this.chatInterface.send(
          channel,
          responseData,
          response.threadResponses!,
          response.threadIsSync!,
        )
        callback()
      } catch (error) {
        Logger.logError({}, error)
        callback()
      }
    })
  }

  public async initContext() {
    if (this.event.userExternalId) {
      this.contextManager.userchat.init(
        this.platform, this.event.userExternalId, this.event.channel, this.event.isChannelMessage
      )
    }
  }

  public async fetchContext() {
    if (this.event.userExternalId) {
      if (!this.userRequireOnboarding) {
        await this.contextManager.userchat.get()
      }

      return this.contextManager.userchat.context
    }
  }

  public getUserApiHeaders(userExternalId?: string): DailyBotUserHeadersParamsType {
    return {
      platform: this.platform,
      user_external_id: (userExternalId)? userExternalId: this.event.userExternalId
    }
  }

  /**
   * Returns from DailyBot API the context of current user
   * related with the external platform and related organization
   */
  public async fetchDailyBotEnvironment(): Promise<any> {
    Logger.log('> Fetching DailyBot organization team environment...')

    let userEnvironmentInfo: OpenChatFetchEnvironmentAPIResponseType
    userEnvironmentInfo = await this.api.endpoints.internal.openChatFetchEnvironment.send({
      requestBody: {
        platform: this.platform,
        user_external_id: this.event.userExternalId,
        organization_external_id: this.event.organizationExternalId,
      }
    })

    if (userEnvironmentInfo.body.organization) {
      this.organization = userEnvironmentInfo.body.organization
      this.responseMaker.setLanguage(this.organization.language)
      this.responseMaker.reportMaker.setReportTimezone(this.organization.timezone)
    }

    if (userEnvironmentInfo.body.user) {
      this.user = userEnvironmentInfo.body.user
      if (!this.user.has_accepted_terms_and_conditions || !this.user.has_completed_onboarding) {
        this.userRequireOnboarding = true
      }
      this.responseMaker.reportMaker.setReportTimezone(this.user.timezone)
    }

    if (!this.organization || !this.user) {
      this.userRequireOnboarding = true
    }
    if (userEnvironmentInfo.body.commands) {
      this.commands = userEnvironmentInfo.body.commands
    }

    this.setLoggerContext()
    return userEnvironmentInfo
  }

  public async createConfigureAccount(): Promise<any> {
    let createAccountResult: CreateConfigureAccountAPIResponseType
    try {
      createAccountResult = await this.api.endpoints.internal.createConfigureAccount.send({
        requestBody: {
          platform: this.platform,
          user_external_id: this.event.userExternalId,
          organization_external_id: this.event.organizationExternalId,
          original_bot_event: this.originalEvent,
        }
      })
      if (createAccountResult.body.user) {
        this.user = createAccountResult.body.user
      }
      return createAccountResult
    } catch (error) {
      if (error.status === HTTPStatusCode.HTTP_402_PAYMENT_REQUIRED) {
        throw {
          status: HTTPStatusCode.HTTP_402_PAYMENT_REQUIRED,
          code: 'plan_max_seats_limit_reached'
        }
      }
      throw error
    }
  }

  public setLoggerContext(): void {
    if (this.organization) {
      Logger.setTagContext({
        organizationId: `${this.organization.id} (Ext: ${this.organization.chat_platform_data.organization_external_id})`,
        organizationName: this.organization.name,
        organizationPlan: this.organization.plan_type!,
      })

      Logger.setExtraContext({
        organizationBotLanguage: this.organization.language,
        organizationCreated: moment(this.organization.created_at).fromNow(),
      })
    }

    if (this.user) {
      Logger.setUserContext(this.user.chat_platform_data.user_external_id, this.user.id, this.user.email, this.user.full_name)
      Logger.setExtraContext({
        userRequireOnboarding: this.userRequireOnboarding,
        userJoined: moment(this.user.date_joined).fromNow(),
        userRole: this.user.role,
      })
    }
  }

  public async getUserAuthToken(ttl: number = 300): Promise<string> {
    let userAuthToken: GetAuthTokenAPIResponseType = await this.api.endpoints.internal.getAuthToken.send(
      {
        queryParams: {
          ttl: ttl
        }
      },
      this.getUserApiHeaders()
    )

    return userAuthToken.body.access_token
  }

  public getUserName(): string {
    if (this.user) {
      return this.user.full_name.split(' ')[0]
    }
    return ''
  }

  public getBotAccessToken(): null | string {
    if (
      this.organization
      && this.organization.chat_platform_data
      && this.organization.chat_platform_data.access_token
    ) {
      return this.organization.chat_platform_data.access_token as string
    } else {
      return null
    }
  }

  public hasOrganizationFeatureEnabled(feature: string): boolean {
    return (
      this.organization
      && this.organization.features
      && this.organization.features[feature]
      && Boolean(this.organization.features[feature].value)
    )
  }

  public hasOrganizationFeatureEnabledAndLimitHasBeenReached(feature: string): boolean {
    return (
      this.hasOrganizationFeatureEnabled(feature)
      && this.organization.features[feature].limited
      && this.organization.features[feature].limit_reached
    )
  }

  public async notificationToShow(): Promise<string> {
    let text: string = ''
    let config: GlobalConstanceItemType = await this.contextManager.constance.getGlobalConfig()
    try {
      if (config.CUSTOM_NOTIFICATIONS) {
        for (const key in config.CUSTOM_NOTIFICATIONS) {
          const currentNotification: CustomNotificationType = config.CUSTOM_NOTIFICATIONS[key]

          let sendNotification: boolean = currentNotification.is_enabled
          if (currentNotification.dates) {
            sendNotification = sendNotification && this.isAvailableInTime(currentNotification)
          }
          if (utils.isObject(currentNotification.target)) {
            sendNotification = sendNotification && this.isAvailableForPlan(currentNotification.target.plans)
            sendNotification = sendNotification && this.isAvailableForRole(currentNotification.target.roles)
            sendNotification = sendNotification && this.isAvailableForPlatform(currentNotification.target.platforms)
            sendNotification = sendNotification && this.isAvailableForOrganization(currentNotification.target.organizations)
          }

          if (sendNotification && utils.isObject(currentNotification.message) && currentNotification.message[this.responseMaker.language]) {
            text += this.responseMaker.lineBreak()
            text += this.responseMaker.__('defaultVarTranslator', {
              text: currentNotification.message[this.responseMaker.language]
            })
            break
          }
        }
      }
    } catch (error) {
      Logger.logError({}, error)
      text = ''
    }
    return text
  }

  protected isAvailableInTime(currentNotification: CustomNotificationType): boolean {
    let currentDate = moment()
    let startDate = moment(currentNotification.dates.start)
    let endDate = moment(currentNotification.dates.end)
    let timezone: string
    if (currentNotification.target.timezone) {
      timezone = currentNotification.target.timezone
    } else {
      timezone = this.user.timezone
    }

    currentDate = currentDate.tz(timezone)
    startDate = startDate.tz(timezone)
    endDate = endDate.tz(timezone)

    return (
      currentDate.isValid() && startDate.isValid() && endDate.isValid()
      && (
        currentDate >= startDate && currentDate < endDate
      )
    )
  }

  protected isAvailableForPlan(plans: Array<Plan> | null | undefined): boolean {
    const userPlan: Plan = (this.organization.plan_type)? this.organization.plan_type: Plan.FREE
    if (plans && Array.isArray(plans) && plans.length) {
      return plans.includes(userPlan)
    }
    return true
  }

  protected isAvailableForRole(targetRoles: Array<UserRole> | null | undefined): boolean {
    const userRole: UserRole = this.user.role
    if (targetRoles && Array.isArray(targetRoles) && targetRoles.length) {
      return targetRoles.includes(userRole)
    }
    return true
  }

  protected isAvailableForPlatform(platforms: Array<ChatPlatformEType> | null | undefined): boolean {
    const chatPlaform: ChatPlatformEType = this.platform
    if (platforms && Array.isArray(platforms) && platforms.length) {
      return platforms.includes(chatPlaform)
    }
    return true
  }

  protected isAvailableForOrganization(organizations: Array<number> | null | undefined): boolean {
    const organizationId: number = this.organization.id
    if (organizations && Array.isArray(organizations) && organizations.length) {
      return organizations.includes(organizationId)
    }
    return true
  }

  async updateOneFollowupReport(response: DailyResponseType, messageId: string, channel: string, simpleReport: boolean): Promise<void> {
    /*
      In a block the maximum number of characters that we can support is 3000
      we need to truncate responses that could reach that limit
    */
    for (let key in response.content) {
      let content: string = response.content[key]
      content = this.responseMaker.parseContent(content)
      const MAX_RESPONSE_LENGTH: number = 2000
      if (content.length > MAX_RESPONSE_LENGTH) {
        content = utils.truncateText(content, MAX_RESPONSE_LENGTH)
      }
      response.content[key] = content
    }
    let reportToUpdate: HandleResponseType = this.responseMaker.reportMaker.buildOneFollowupReport(response, simpleReport)
    if (reportToUpdate) {
      let responseToUpdate: BaseResponseDataType = reportToUpdate as BaseResponseDataType
      await this.chatInterface.updateMessage(
        messageId,
        channel,
        responseToUpdate as BaseResponseDataType,
      )
    }
  }

  async updateOneFollowupBlockersReport(response: DailyResponseType, messageId: string, channel: string, extra: ObjectType): Promise<void> {
    throw new Error(`This method not supported by this integration (${this.platform}): updateOneFollowupBlockersReport.`)
  }

  async updateAllFollowupReportsPublishedOnChannels(response: DailyResponseType, responsePersisted: ObjectType): Promise<void> {
    if (response && responsePersisted) {
      for (let index = 0; index < responsePersisted.reports.length; index++) {
        let messageId: string = responsePersisted.reports[index].messageId
        let channel: string = responsePersisted.reports[index].channelId
        let simpleReport: boolean = responsePersisted.reports[index].simpleReport
        let followup: ObjectType = responsePersisted.reports[index].followup
        let extra: ObjectType | undefined = responsePersisted.reports[index].extra
        if (followup) {
          response.followup = followup
        }
        if (extra && extra.usersDict && extra.handleResponse) {
          await this.updateOneFollowupBlockersReport(response, messageId, channel, extra)
        } else {
          await this.updateOneFollowupReport(response, messageId, channel, simpleReport)
        }

      }
    }
  }
}


export default BaseBotEngine
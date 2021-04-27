import crypto from 'crypto'
import BaseApiGateway from '../baseBotApiGateway'
import { ChatPlatformEType } from '../../../../lib/enum'
import Logger from '../../../../lib/logger'
import { ObjectType } from '../../../../lib/type'
import settings from '../../lib/settings'


class SlackApiGateway extends BaseApiGateway {
  protected platform: ChatPlatformEType

  constructor() {
    super(ChatPlatformEType.SLACK)
  }

  public async processEvent(request: any): Promise<ObjectType | string> {
    Logger.log('> Process event...')
    if (typeof request.body === 'string') {
      request.body = JSON.parse(request.body)
    }

    if (typeof request.body.payload === 'string') {
      request.body.payload = JSON.parse(request.body.payload)
    }

    if (!this.validateRequest(request)) {
      Logger.log('> Ignoring bot message or not relevant events...')
      return { status: 'Bot response request not processed' }
    }

    let challengeResponse = this.shouldReturnChallenge(request)
    if (challengeResponse) {
      return challengeResponse
    }

    if (!this.shouldProcessRequest(request)) {
      Logger.log('> Ignoring bot message or not relevant events...')
      return { status: '200 OK' }
    }

    try {
      let result = await this.snsPublisher.publish(request.body)
      if (result && result.status === '200 OK') {
        return result
      } else {
        return { status: 'Not Good' }
      }
    } catch (err) {
      Logger.logError({ tags: [ { 'method': 'processEvent'} ] }, err)
      return { status: 'Not Good' }
    }
  }

  /**
   * Validate if request comes from slack using singing signature.
   * Take a look at: https://api.slack.com/docs/verifying-requests-from-slack
   */
  private verifyRequestSignature(request: ObjectType): boolean {
    let requestBody = request.rawBody
    if (typeof request.rawBody !== 'string') {
      requestBody = JSON.stringify(request.rawBody)
    }
    const headers = request.normalizedHeaders || request.headers
    const timestamp = headers['x-slack-request-timestamp']
    const slackSignature = headers['x-slack-signature']
    const sigBasestring = 'v0:' + timestamp + ':' + requestBody
    const mySignature = 'v0=' + crypto.createHmac('sha256', `${settings.SLACK_SIGNING_SECRET}`)
                                      .update(sigBasestring, 'utf8')
                                      .digest('hex')
    const isValidSignature = crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'))
    return Boolean(isValidSignature)
  }

  public validateRequest(request: any): boolean {
    // Ignoring requests from bot
    if (request.body && request.body.event && (request.body.event.bot_id)) {
      return false
    }

    if (['local', 'testing'].includes(`${settings.ENVIRONMENT}`)) {
      return true
    }
    return this.verifyRequestSignature(request)
  }

  public shouldProcessRequest(request: any): boolean {
    const forbiddenSlackSubtypes = ['message_deleted', 'bot_message', 'user_change']

    const isAnUserMessage = (
      request.body.type === 'event_callback' &&
      !request.body.event.bot_id &&
      request.body.event.user && request.body.event.user !== 'USLACKBOT' &&
      request.body.event && (
        !forbiddenSlackSubtypes.includes(request.body.event.subtype)
        &&
        !forbiddenSlackSubtypes.includes(request.body.event.type)
      )
    )

    const isAnInteractiveMessage = request.body.payload
    const isAMessageChangedEvent = (
      request.body.event &&
      request.body.event.subtype === 'message_changed' &&
      request.body.event.previous_message &&
      request.body.event.previous_message.user
    )

    const channelEvents = ['channel_created', 'channel_archive', 'channel_unarchive', 'channel_deleted', 'channel_rename', 'channel_left']
    const privateChannelEvents = ['group_archive', 'group_unarchive', 'group_deleted', 'group_rename', 'group_left']
    const memberEvents = ['member_joined_channel']
    const eventTypesAllowed = channelEvents.concat(privateChannelEvents).concat(memberEvents)
    const isRequestEventAllowed = request.body.event && eventTypesAllowed.includes(request.body.event.type)

    if (isAnUserMessage || isAnInteractiveMessage || isAMessageChangedEvent || isRequestEventAllowed) {
      Logger.log('> Processing chat event request...')
      return true
    } else {
      Logger.log('> Ignoring request...',
                  '  ---',
                  '  Type: ' + request.body.type,
                  '  Event Type: ' + ((request.body.event)? request.body.event.type: 'None'),
                  '  Subtype: ' + ((request.body.event)? request.body.event.subtype: 'None'),
                  '  Bot Id: ' + ((request.body.event)? request.body.event.bot_id: 'None'))
      return false
    }
  }

  private shouldReturnChallenge(request: any): string {
    if (request.body.challenge && request.body.type === 'url_verification') {
      Logger.log('> Processing slack "challenge" for events subscriptions...')
      return request.body.challenge
    }
    return ''
  }
}

export default SlackApiGateway
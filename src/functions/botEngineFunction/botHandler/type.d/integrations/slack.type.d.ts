
import { ObjectType } from '../../../../../lib/type'
import { BaseResponseDataType, ResponseChannelType } from '../type'


/**
 * The following Slack rich text parameters are used
 * by "chat.postMessage" method to send a message.
 * @see {@link https://api.slack.com/methods/chat.postMessage}
 */
export interface SlackRichTextParams {
  blocks?: Array<ObjectType>
  icon_url?: string
  username?: string
  attachments?: Array<ObjectType>
}

export interface SlackBaseResponseDataType extends BaseResponseDataType {
  richText?: SlackRichTextParams
}

export type SlackThreadResponseType = Array<SlackBaseResponseDataType | Array<SlackBaseResponseDataType>>

export interface SlackResponseDataType extends SlackBaseResponseDataType {
  channel?: ResponseChannelType
  threadResponses?: SlackThreadResponseType
  threadIsSync?: boolean
}

export type SlackHandleResponseType = null | SlackResponseDataType | Array<SlackResponseDataType>


import { ObjectType } from '../../../../../lib/type'
import { BaseResponseDataType, ResponseChannelType } from '../type'



/**
 * The following MSTeams rich text parameters are used
 * by "chat.postMessage" method to send a message.
 * @see {@link https://api.slack.com/methods/chat.postMessage}
 */
export interface MSTeamsRichTextParams {
  attachments?: Array<ObjectType>
}

export interface MSTeamsBaseResponseDataType extends BaseResponseDataType {
  richText?: MSTeamsRichTextParams
}

export type MSTeamsThreadResponseType = Array<MSTeamsBaseResponseDataType | Array<MSTeamsBaseResponseDataType>>

export interface MSTeamsResponseDataType extends MSTeamsBaseResponseDataType {
  channel?: ResponseChannelType
  threadResponses?: MSTeamsThreadResponseType
  threadIsSync?: boolean
}

export type MSTeamsHandleResponseType = null | MSTeamsResponseDataType | Array<MSTeamsResponseDataType>

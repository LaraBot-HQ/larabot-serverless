
import { ObjectType } from '../../../../../lib/type'
import { BaseResponseDataType, ResponseChannelType } from '../type'


/**
 * The following GChat rich text parameters are used
 * by "spaces.messages/create" method to send a message.
 * @see {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.messages/create}
 */
export interface GChatRichTextParams {
  cards?: Array<ObjectType>
}

export interface GChatBaseResponseDataType extends BaseResponseDataType {
  richText?: GChatRichTextParams
}

export type GChatThreadResponseType = Array<GChatBaseResponseDataType | Array<GChatBaseResponseDataType>>

export interface GChatResponseDataType extends GChatBaseResponseDataType {
  channel?: ResponseChannelType
  threadResponses?: GChatThreadResponseType
  threadIsSync?: boolean
}

export type GChatHandleResponseType = null | GChatResponseDataType | Array<GChatResponseDataType>
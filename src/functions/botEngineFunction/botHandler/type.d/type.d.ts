import { ObjectType } from '../../../../lib/type'


export interface ResponseChannelType {
  id: null | string
  thread?: string
  isChannelMessage?: boolean
}

export interface BaseResponseDataType {
  text?: null | string
  richText?: ObjectType
  metadata?: ObjectType | Array<ObjectType>
}

export type ThreadResponseType = Array<BaseResponseDataType | Array<BaseResponseDataType>>

export interface ResponseDataType extends BaseResponseDataType {
  channel?: ResponseChannelType
  threadResponses?: ThreadResponseType
  threadIsSync?: boolean
}

export type HandleResponseType = null | ResponseDataType | Array<ResponseDataType>
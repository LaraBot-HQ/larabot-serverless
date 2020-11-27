import { ChatPlatformEType } from './enum'

export interface ObjectType {
  [key: string]: any
}

export interface MessagePayload {
  chatEvent: boolean,
  platform: ChatPlatformEType,
  body: any,
}

export interface ChatPlatformRegistryType {
  slack: any,
  hangouts: any,
  msteams: any,
}
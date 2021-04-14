import { ObjectType } from '../type'
import { HTTPStatusCode } from './enum'


export interface APIResponseBodyErrorType {
  code: HTTPStatusCode
  message: string
  status: string
}

export interface APIResponseType {
  body: ObjectType
  statusCode: HTTPStatusCode
}
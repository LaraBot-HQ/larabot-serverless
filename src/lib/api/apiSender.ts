import request, { Response } from 'superagent'
import settings from '../settings'
import { ObjectType } from '../type'
import { HTTPMethod } from './enum'
import { APIResponseType } from './type'


/**
 * Provides methods to send any type of HTTP request to external APIs.
 */
class APISender {

  static async send(method: HTTPMethod, uri: string, data: ObjectType = {}, headers: ObjectType = {}): Promise<APIResponseType> {
    const requestResponse: Response = await request[method](uri).set(headers).timeout(settings.REQUEST_TIMEOUT).send(data)
    let result: APIResponseType = {
      body: requestResponse.body,
      statusCode: requestResponse.status,
    }
    return result
  }
}


export default APISender
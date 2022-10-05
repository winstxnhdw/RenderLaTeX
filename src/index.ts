import { listen_to } from '@/bot'
import { twitter_activity, twitter_client } from '@/libs/Twitter'
import type { Handler, APIGatewayProxyResultV2 } from 'aws-lambda'

type LambdaFunctionURLEvent = {
  version: string
  routeKey: string
  rawPath: string
  rawQueryString: string
  headers: {
    host: string
  }
  queryStringParameters?: {
    [key: string]: any
  }
  requestContext: {
    accountId: string
    apiId: string
    domainName: string
    domainPrefix: string
    http: {
      method: 'GET' | 'POST'
      path: string
      protocol: string
      sourceIp: string
      userAgent: string | null
    }
    requestId: string
    routeKey: string
    stage: string
    time: string
    timeEpoch: number
  }
  body?: string
  isBase64Encoded: false
}

export const handler: Handler = async (event: LambdaFunctionURLEvent): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method === 'GET') {
    const response = twitter_activity.handle_crc(event.queryStringParameters!['crc_token'])
    return typeof response === 'string'
      ? { statusCode: 400, body: response }
      : { statusCode: 200, body: JSON.stringify(response) }
  }

  listen_to.tweet_create_events()

  return (await twitter_activity.handle_post(event.body))
    ? { statusCode: 200, body: 'OK!' }
    : { statusCode: 400, body: 'Invalid request!' }
}

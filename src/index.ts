import { twitter_activity } from '@/libs/Twitter'
import type { Handler, APIGatewayProxyResultV2, Context, APIGatewayEvent } from 'aws-lambda'

type LambdaFunctionURL = {
  version: string
  routeKey: string
  rawPath: string
  rawQueryString: string
  headers: {
    host: string
  }
  queryStringParameters: {}
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
      userAgent: unknown
    }
    requestId: string
    routeKey: string
    stage: string
    time: string
    timeEpoch: number
  }
  isBase64Encoded: false
}

export const handler: Handler = async (event: LambdaFunctionURL, _: Context): Promise<APIGatewayProxyResultV2> => {
  console.log(event)
  if (event.requestContext.http.method === 'GET') {
    const response = twitter_activity.handle_crc(event.queryStringParameters)
    return typeof response === 'string'
      ? { statusCode: 400, body: response }
      : { statusCode: 200, body: response.response_token }
  }

  twitter_activity.handle_post(event)

  return {
    statusCode: 200,
    body: 'OK'
  }
}

import { twitter_activity } from '@/libs/Twitter'
import type { Handler, APIGatewayProxyResultV2, Context } from 'aws-lambda'

type LambdaFunctionURLEvent = {
  version: string
  routeKey: string
  rawPath: string
  rawQueryString: string
  headers: {
    host: string
  }
  queryStringParameters?: {}
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

export const handler: Handler = async (event: LambdaFunctionURLEvent, _: Context): Promise<APIGatewayProxyResultV2> => {
  console.log(event.requestContext.http.method)
  if (event.requestContext.http.method === 'GET') {
    if (!event.queryStringParameters) return { statusCode: 404, body: 'No query found.' }

    const response = twitter_activity.handle_crc(event.queryStringParameters)
    return typeof response === 'string'
      ? { statusCode: 400, body: response }
      : { statusCode: 200, body: JSON.stringify(response) }
  }

  twitter_activity.handle_post(event)

  return {
    statusCode: 200,
    body: 'OK'
  }
}

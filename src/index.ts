import { twitter_activity } from '@/libs/Twitter'
import type { APIGatewayProxyEvent, Handler, APIGatewayProxyResultV2, Context } from 'aws-lambda'

export const handler: Handler = async (event: APIGatewayProxyEvent, _: Context): Promise<APIGatewayProxyResultV2> => {
  if (event.httpMethod === 'GET') {
    const response = twitter_activity.handle_crc(event.queryStringParameters!)
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

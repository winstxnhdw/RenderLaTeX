import { listen_to } from '@/bot'
import { twitter_activity } from '@/libs/Twitter'
import type {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayProxyResultV2,
  Handler
} from 'aws-lambda'

listen_to.tweet_create_events()

export const handler: Handler = async (
  event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>
): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method === 'POST') {
    return (await twitter_activity.handle_post(event.body))
      ? { statusCode: 200, body: 'OK!' }
      : { statusCode: 400, body: 'Invalid request!' }
  }

  if (event.queryStringParameters !== undefined) {
    const response = twitter_activity.handle_crc(event.queryStringParameters['crc_token'] as string)

    return typeof response === 'string'
      ? { statusCode: 400, body: response }
      : { statusCode: 200, body: JSON.stringify(response) }
  }

  return { statusCode: 400, body: 'Invalid request!' }
}

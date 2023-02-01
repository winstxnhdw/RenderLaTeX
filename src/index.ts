import { listen_to } from '@/bot'
import { twitter_activity } from '@/libs/Twitter'
import type {
  Handler,
  APIGatewayProxyResultV2,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayEventRequestContextV2
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

  if (event.queryStringParameters === undefined) return { statusCode: 400, body: 'Invalid request!' }
  const response = twitter_activity.handle_crc(event.queryStringParameters['crc_token'] as string)

  return typeof response === 'string'
    ? { statusCode: 400, body: response }
    : { statusCode: 200, body: JSON.stringify(response) }
}

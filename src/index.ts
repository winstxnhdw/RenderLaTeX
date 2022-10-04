import { twitter_activity } from '@/libs/Twitter'
import type { APIGatewayProxyEvent, Handler, APIGatewayProxyResultV2, Context } from 'aws-lambda'

export const handler: Handler = async (event: APIGatewayProxyEvent, _: Context): Promise<APIGatewayProxyResultV2> => {
  twitter_activity.handle_get(event)
  // twitter_activity.handle_post(event)

  return {
    statusCode: 200,
    body: 'OK'
  }
}

import type { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import bot from '@/bot'

async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
  bot()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Lambda function has successfully executed.',
      input: event
    })
  }
}

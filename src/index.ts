import type { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import Bot from '@/bot'

async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
  Bot.init()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Lambda function has been successfully executed.',
      input: event
    })
  }
}

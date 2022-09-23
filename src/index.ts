import Bot from '@/bot'
import type { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
  Bot.start()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Lambda function has been successfully executed.',
      input: event
    })
  }
}

// Remove later
Bot.start()

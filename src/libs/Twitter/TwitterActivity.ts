import { Activity, isExpectEventType, WebhookHandler } from 'twict'
import type { ActivityEventType, ActivityEventMap, Auth, CrcResponse } from 'twict'
import type { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'

export class TwitterActivity {
  private readonly activity: Activity
  private readonly handler: WebhookHandler

  constructor(environment_label: string, tokens: Auth) {
    this.activity = new Activity(environment_label, tokens)
    this.handler = new WebhookHandler(tokens, this.activity)
  }

  handle_crc(query_string_parameters: APIGatewayProxyEventQueryStringParameters): CrcResponse | string {
    const crc_token = query_string_parameters['crc_token']
    return typeof crc_token === 'string' ? this.handler.crc(crc_token) : "There is no 'crc_token' found in the request!"
  }

  handle_post(body: any) {
    console.log(body)
  }

  set_event<T extends ActivityEventType>(event_type: T, action: (event: ActivityEventMap[T]) => void) {
    this.activity.onEvent((event) => {
      if (!isExpectEventType(event, event_type)) return
      action(event)
    })
  }
}

import { Activity, isExpectEventType, WebhookHandler } from 'twict'
import type { ActivityEventType, ActivityEvent, ActivityEventMap, Auth, CrcResponse } from 'twict'
import type { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'

export class TwitterActivity {
  private readonly activity: Activity
  private readonly handler: WebhookHandler

  constructor(environment_label: string, tokens: Auth) {
    this.activity = new Activity(environment_label, tokens)
    this.handler = new WebhookHandler(tokens, this.activity)
  }

  handle_crc(crc_token: string | undefined): CrcResponse | string {
    return typeof crc_token === 'string'
      ? this.handler.crc(crc_token)
      : "There is no 'crc_token' found in this request!"
  }

  handle_post(body: string | undefined): boolean {
    if (typeof body !== 'string') return false
    console.log(body)
    this.handler.handle(JSON.parse(body))
    return true
  }

  set_event<T extends ActivityEventType>(event_type: T, action: (event: ActivityEventMap[T]) => void) {
    this.activity.onEvent((event) => {
      if (!isExpectEventType(event, event_type)) return
      action(event)
    })
  }
}

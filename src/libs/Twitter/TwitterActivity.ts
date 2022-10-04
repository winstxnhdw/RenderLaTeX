import { Activity, isExpectEventType, WebhookHandler } from 'twict'
import type { ActivityEventType, ActivityEventMap, Auth } from 'twict'

export class TwitterActivity {
  private readonly activity: Activity

  constructor(environment_label: string, tokens: Auth) {
    this.activity = new Activity(environment_label, tokens)
    const handler = new WebhookHandler(tokens, this.activity)
  }

  handle_get(request: any) {
    console.log(request)
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

import { Activity, isExpectEventType } from 'twict'
import type { ActivityEventType, ActivityEventMap, Auth } from 'twict'

export class TwitterActivity {
  private readonly activity: Activity

  constructor(environment_label: string, tokens: Auth) {
    this.activity = new Activity(environment_label, tokens)
  }

  async init_serverless_app(webhook_endpoint: string) {
    const app = await this.activity.listen(8000)

    await this.activity.deleteAllWebhooks()
    await this.activity.registerWebhook(webhook_endpoint)
    await this.activity.subscribe()

    return app
  }

  set_event<T extends ActivityEventType>(event_type: T, action: (event: ActivityEventMap[T]) => void) {
    this.activity.onEvent((event) => {
      if (!isExpectEventType(event, event_type)) return
      action(event)
    })
  }
}

import type { ActivityEvent, Auth, CrcResponse, WebhookHandlable } from 'webhoot'
import { Activity } from 'webhoot'

export class TwitterActivity {
  private readonly activity: Activity
  private readonly handler: WebhookHandlable

  constructor(environment_label: string, tokens: Auth) {
    this.activity = new Activity(environment_label, tokens)
    this.handler = this.activity.getHandler()
  }

  get internal(): Activity {
    return this.activity
  }

  handle_crc(crc_token: string | undefined): CrcResponse | string {
    return this.handler.handle_crc(crc_token)
  }

  async handle_post(body: string | undefined): Promise<boolean> {
    if (body === undefined) return false

    await this.handler.handle_post(JSON.parse(body) as ActivityEvent)
    return true
  }
}

import { Activity } from 'webhoot'
import type { WebhookHandlable, Auth, CrcResponse } from 'webhoot'

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

  async register_webhook(webhook_endpoint: string) {
    await this.activity.deleteAllWebhooks()
    await this.activity.registerWebhook(webhook_endpoint)
    await this.activity.subscribe()
  }

  handle_crc(crc_token: string | undefined): CrcResponse | string {
    return this.handler.handle_crc(crc_token)
  }

  async handle_post(body: string | undefined): Promise<boolean> {
    if (typeof body !== 'string') return false

    await this.handler.handle_post(JSON.parse(body))
    return true
  }
}

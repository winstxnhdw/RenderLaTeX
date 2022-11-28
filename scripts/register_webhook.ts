import { config } from '@/config'
import { twitter_activity } from '@/libs/Twitter'

async function main() {
  await twitter_activity.register_webhook(config.WEBHOOK_ENDPOINT)
}

main()

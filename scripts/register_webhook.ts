import { config } from '../src/config'
import { twitter_activity } from '../src/libs/Twitter'

async function main() {
  twitter_activity.register_webhook(config.WEBHOOK_ENDPOINT)
}

main()

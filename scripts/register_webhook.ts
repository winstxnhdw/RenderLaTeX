import { config } from '../src/config'
import { Activity } from 'twict'

const activity = new Activity(config.TWITTER_ENVIRONMENT_LABEL, {
  consumerKey: config.TWITTER_API_KEY,
  consumerSecret: config.TWITTER_API_SECRET,
  token: config.TWITTER_OAUTH_TOKEN,
  tokenSecret: config.TWITTER_OAUTH_SECRET
})

async function main() {
  await activity.deleteAllWebhooks()
  await activity.registerWebhook(config.WEBHOOK_ENDPOINT)
  await activity.subscribe()
}

main()

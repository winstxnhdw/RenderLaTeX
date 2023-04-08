import { TwitterActivity } from '@/libs/Twitter/TwitterActivity'
import 'dotenv/config'
import { cleanEnv, str } from 'envalid'

async function main() {
  const config = cleanEnv(process.env, {
    TWITTER_API_KEY: str(),
    TWITTER_API_SECRET: str(),
    TWITTER_OAUTH_TOKEN: str(),
    TWITTER_OAUTH_SECRET: str(),
    TWITTER_ENVIRONMENT_LABEL: str(),
    WEBHOOK_ENDPOINT: str()
  })

  const twitter_activity = new TwitterActivity(config.TWITTER_ENVIRONMENT_LABEL, {
    consumerKey: config.TWITTER_API_KEY,
    consumerSecret: config.TWITTER_API_SECRET,
    token: config.TWITTER_OAUTH_TOKEN,
    tokenSecret: config.TWITTER_OAUTH_SECRET
  }).internal

  await twitter_activity.deleteAllWebhooks()
  await twitter_activity.registerWebhook(config.WEBHOOK_ENDPOINT)
  await twitter_activity.subscribe()
}

main()

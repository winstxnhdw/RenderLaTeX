import { cleanEnv, str } from 'envalid'
import 'dotenv/config'

export const config = cleanEnv(process.env, {
  TWITTER_API_KEY: str(),
  TWITTER_API_SECRET: str(),
  TWITTER_OAUTH_TOKEN: str(),
  TWITTER_OAUTH_SECRET: str(),
  TWITTER_ENVIRONMENT_LABEL: str(),
  WEBHOOK_ENDPOINT: str()
})

import 'dotenv/config'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(process.env, {
  TWITTER_APP_KEY: str(),
  TWITTER_APP_SECRET: str()
})

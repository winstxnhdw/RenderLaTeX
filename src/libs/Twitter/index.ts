import config from '@/config'
import { Activity } from 'twict'
import TwitterApi from 'twitter-api-v2'

export const twitter_activity = new Activity(config.TWITTER_ENVIRONMENT_LABEL, {
  consumerKey: config.TWITTER_API_KEY,
  consumerSecret: config.TWITTER_API_SECRET,
  token: config.TWITTER_OAUTH_TOKEN,
  tokenSecret: config.TWITTER_OAUTH_SECRET
})

export const twitter_client = new TwitterApi({
  appKey: config.TWITTER_API_KEY,
  appSecret: config.TWITTER_API_SECRET,
  accessToken: config.TWITTER_OAUTH_TOKEN,
  accessSecret: config.TWITTER_OAUTH_SECRET
})

import { twitter_activity } from '@/libs/Twitter'
import { handle_tweet_create_events } from '@/bot/events'

twitter_activity.set_event('tweet_create_events', (event) => handle_tweet_create_events(event))

export const start = async (webhook_endpoint: string) => await twitter_activity.init_serverless_app(webhook_endpoint)

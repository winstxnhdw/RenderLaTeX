import { twitter_activity } from '@/libs/Twitter'
import { handle_tweet_create_events } from '@/bot/events'

export const listen_to = {
  tweet_create_events: () => twitter_activity.internal.onTweetCreate(handle_tweet_create_events)
}

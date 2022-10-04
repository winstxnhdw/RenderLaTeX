import { twitter_activity } from '@/libs/Twitter'
import { handle_tweet_create_events } from '@/bot/events'

export const listen_to = {
  tweet_create_events: () =>
    twitter_activity.set_event('tweet_create_events', (event) => handle_tweet_create_events(event))
}

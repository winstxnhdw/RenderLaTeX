import { validate_mentions } from '@/bot/filters'
import { handle_mentions } from './handlers'
import type { TweetCreateEvents } from 'twict'

export const handle_tweet_create_events = async (event: TweetCreateEvents) => {
  for (const tweet_create_event of event.tweet_create_events) {
    if (!validate_mentions(tweet_create_event.text)) continue
    console.log(tweet_create_event)
    handle_mentions(tweet_create_event.id_str)
  }
}

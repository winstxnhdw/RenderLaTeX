import { handle_mentions } from '@/bot/events/handlers'
import { validate_mentions } from '@/bot/filters'
import type { TweetCreateEvents } from 'webhoot'

export const handle_tweet_create_events = async (event: TweetCreateEvents) => {
  await Promise.all(
    event.tweet_create_events.map(async (tweet_create_event) => {
      if (!validate_mentions(tweet_create_event.text)) return
      await handle_mentions(tweet_create_event.id_str)
    })
  )
}

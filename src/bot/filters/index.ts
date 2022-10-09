import { illegal_words } from '@/bot/filters/banned_words'
import { FilterBuilder } from '@/bot/filters/FilterBuilder'

const ignore_retweets = (tweet: string): Boolean => !tweet.startsWith('RT')

const ignore_tweets_with_illegal_words = (tweet: string): Boolean => {
  for (const word of illegal_words) {
    if (!tweet.includes(word)) continue
    return false
  }

  return true
}

export const validate_mentions = (tweet: string): Boolean => {
  const filter_builder = new FilterBuilder<string>()
  filter_builder.add(ignore_tweets_with_illegal_words)
  filter_builder.add(ignore_retweets)

  return filter_builder.validate(tweet)
}

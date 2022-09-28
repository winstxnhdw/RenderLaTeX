import { commands } from '@/bot/commands'
import { FilterBuilder } from '@/bot/filters/FilterBuilder'

const ignore_retweets = (tweet: string) => (tweet.startsWith('RT') ? false : true)

const ignore_tweets_without_commands = (tweet: string) => {
  for (const command of Object.values(commands)) {
    if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(command)) continue
    return true
  }

  return false
}

export const validate_mentions = (tweet: string) => {
  const filter_builder = new FilterBuilder<string>()
  filter_builder.add(ignore_retweets)
  filter_builder.add(ignore_tweets_without_commands)
  return filter_builder.compile().validate(tweet)
}

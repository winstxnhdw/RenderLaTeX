import { illegal_words } from '@/bot/filters/banned_words'
import { commands } from '@/bot/commands'
import { FilterBuilder } from '@/bot/filters/FilterBuilder'

const ignore_retweets = (tweet: string): Boolean => !tweet.startsWith('RT')

const ignore_tweets_with_illegal_words = (tweet: string): Boolean => {
  for (const word of illegal_words) {
    if (!tweet.includes(word)) continue
    return false
  }

  return true
}

const ignore_tweets_without_commands = (tweet: string): Boolean => {
  for (const command of Object.values(commands)) {
    if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(command.name)) continue
    return true
  }

  return false
}

export const validate_mentions = (tweet: string): Boolean => {
  console.log(tweet)
  const filter_builder = new FilterBuilder<string>()
  filter_builder.add(ignore_tweets_with_illegal_words)
  filter_builder.add(ignore_retweets)
  filter_builder.add(ignore_tweets_without_commands)

  return filter_builder.validate(tweet)
}

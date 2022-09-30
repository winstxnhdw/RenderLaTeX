import { twitter_client } from '@/libs/Twitter'
import { commands } from '@/bot/commands'

export const get_command_input = (tweet: string, command: string): string => {
  const tweet_without_command = tweet.slice(tweet.indexOf(command) + command.length)

  return tweet_without_command.includes('http')
    ? tweet_without_command.slice(0, tweet_without_command.indexOf('http')).trim()
    : tweet_without_command.trim()
}

export const handle_mentions = async (in_reply_to_status_id: string) => {
  const tweet = await twitter_client.get_tweet_text(in_reply_to_status_id)

  for (const command of Object.values(commands)) {
    if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(command.name)) continue

    const filtered_tweet = get_command_input(tweet, command.name)
    command.execute(filtered_tweet, in_reply_to_status_id)
    return
  }
}

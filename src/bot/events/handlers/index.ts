import { twitter_client } from '@/libs/Twitter'
import { commands } from '@/bot/commands'
import { get_command_input } from '@/bot/commands/helpers'

export const handle_mentions = async (tweet_id: string) => {
  const tweet = await twitter_client.get_tweet(tweet_id)
  for (const command of Object.values(commands)) {
    if (!tweet.text.slice(tweet.text.indexOf(' ') + 1).startsWith(command.name)) continue

    const tweet_with_input = { input: get_command_input(tweet.text, command.name), ...tweet }
    await command.execute(twitter_client, tweet_with_input)
    return
  }
}

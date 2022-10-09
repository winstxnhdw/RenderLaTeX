import { twitter_client } from '@/libs/Twitter'
import { commands } from '@/bot/commands'
import { get_command_input } from '@/bot/commands/helpers'
import { get_tweet_without_handle } from '@/bot/events/helpers'

export const handle_mentions = async (tweet_id: string) => {
  const tweet = await twitter_client.get_tweet(tweet_id)
  const text = tweet.full_text || tweet.text

  for (const command of Object.values(commands)) {
    const username = await twitter_client.get_username()
    if (!get_tweet_without_handle(text, username).startsWith(command.name)) continue

    await command.execute(twitter_client, { input: get_command_input(text, command.name), ...tweet })
    return
  }
}

import { commands } from '@/bot/commands'
import { get_command_input } from '@/bot/commands/helpers'
import { get_tweet_without_handle } from '@/bot/events/helpers'
import { twitter_client } from '@/libs/Twitter'

export const handle_mentions = async (tweet_id: string) => {
  const tweet = await twitter_client.get_tweet(tweet_id)
  const text = tweet.full_text || tweet.text
  console.log(text)

  for (const command of Object.values(commands)) {
    const username = await twitter_client.get_username()
    const tweet_without_handle = get_tweet_without_handle(text, username)
    if (!tweet_without_handle.toLowerCase().startsWith(command.name)) continue

    await command.execute(twitter_client, {
      input: get_command_input(tweet_without_handle, command.name),
      ...tweet
    })

    return
  }
}

import { twitter_client } from '@/libs/Twitter'
import { commands, get_command_input } from '@/bot/commands'

export const handle_mentions = async (in_reply_to_status_id: string) => {
  const tweet = await twitter_client.get_tweet_text(in_reply_to_status_id)
  console.log('hello')
  for (const command of Object.values(commands)) {
    if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(command.name)) continue

    const filtered_tweet = get_command_input(tweet, command.name)
    await command.execute(twitter_client, filtered_tweet, in_reply_to_status_id)
    return
  }
}

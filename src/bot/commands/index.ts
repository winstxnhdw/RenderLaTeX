import { reply_with_latex } from '@/bot/features'
import { Command } from '@/bot/commands/Command'
import type { TwitterClient } from '@/libs/Twitter/TwitterClient'
export { get_command_input } from '@/bot/commands/get_command_input'

const render = async (twitter_client: TwitterClient, tweet: string, in_reply_to_status_id: string) => {
  if (!tweet) {
    await twitter_client.reply('You have not provided any valid LaTeX.', in_reply_to_status_id)
    return
  }

  await reply_with_latex(twitter_client, tweet, in_reply_to_status_id)
}

export const commands = {
  render: new Command('render', render)
}

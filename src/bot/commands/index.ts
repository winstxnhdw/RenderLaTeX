import { twitter_client } from '@/libs/Twitter'
import { reply_with_latex } from '@/bot/features'
import { Command } from '@/bot/commands/Command'

const render = async (tweet: string, in_reply_to_status_id: string) => {
  if (!tweet) {
    await twitter_client.reply('You have not provided any valid LaTeX.', in_reply_to_status_id)
    return
  }

  await reply_with_latex(tweet, in_reply_to_status_id)
}

export const commands = {
  render: new Command('render', render)
}

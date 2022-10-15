import { remove_mentions } from '@/bot/commands/helpers'
import { reply_with_latex } from '@/bot/features'
import { Command } from '@/bot/commands/Command'
import type { CommandAction } from '@/types/index'
import type { TwitterClient } from '@/libs/Twitter/TwitterClient'
import type { TweetV1 } from 'twitter-api-v2'

type TweetWithInput = TweetV1 & {
  input: string
}

const render = async (twitter_client: TwitterClient, tweet: TweetWithInput) => {
  if (tweet.input) {
    await reply_with_latex(twitter_client, tweet.input, tweet.id_str)
  } else if (tweet.reply_count === 0) {
    await twitter_client.reply('Hi, I am a Twitter bot that renders LaTeX. To use me correctly, please check out my pinned tweet!', tweet.id_str)
  } else {
    const replied_tweet = await twitter_client.get_tweet(tweet.in_reply_to_status_id_str as string)
    const filtered_tweet = remove_mentions(replied_tweet.full_text || replied_tweet.text)
    await reply_with_latex(twitter_client, filtered_tweet, tweet.id_str)
  }
}

export const commands = {
  render: new Command('render', render as CommandAction)
}

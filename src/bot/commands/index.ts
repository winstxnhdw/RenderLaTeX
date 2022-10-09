import { remove_mentions } from '@/bot/commands/helpers'
import { reply_with_latex } from '@/bot/features'
import { Command } from '@/bot/commands/Command'
import type { TwitterClient } from '@/libs/Twitter/TwitterClient'
import type { TweetV1 } from 'twitter-api-v2'

type TweetWithInput = TweetV1 & {
  input: string
}

const render = async (twitter_client: TwitterClient, tweet: TweetWithInput) => {
  if (tweet.input) await reply_with_latex(twitter_client, tweet.input, tweet.id_str)
  else if (tweet.reply_count === 0) {
    await twitter_client.reply('You have not provided any valid LaTeX.', tweet.id_str)
  } else {
    const replied_tweet = await twitter_client.get_tweet(tweet.in_reply_to_status_id_str!)
    const filtered_tweet = remove_mentions(replied_tweet.full_text || replied_tweet.text)
    await reply_with_latex(twitter_client, filtered_tweet, tweet.id_str)
  }
}

export const commands = {
  render: new Command('render', render)
}

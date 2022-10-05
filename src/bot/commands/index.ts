import { reply_with_latex } from '@/bot/features'
import { Command } from '@/bot/commands/Command'
import type { TwitterClient } from '@/libs/Twitter/TwitterClient'
import type { TweetV2 } from 'twitter-api-v2'

type TweetWithInput = TweetV2 & {
  input: string
}

const render = async (twitter_client: TwitterClient, tweet: TweetWithInput) => {
  console.log(tweet)

  if (tweet.input) await reply_with_latex(twitter_client, tweet.input, tweet.id)
  else if (tweet.public_metrics?.reply_count === 0) {
    await twitter_client.reply('You have not provided any valid LaTeX.', tweet.id)
  } else {
    console.log(tweet)
  }
  // await twitter_client.get_tweet(tweet.in_reply_to_sta)
}

export const commands = {
  render: new Command('render', render)
}

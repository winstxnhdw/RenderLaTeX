import { twitter_client } from '@/libs/Twitter'
import { reply_with_latex } from '@/bot/features'
import type { TweetCreateEvents } from 'twict'

const commands = {
  render: 'render'
}

export const handle_tweet_create_events = async (event: TweetCreateEvents) => {
  for (const tweet_create_event of event.tweet_create_events) {
    if (!validate_tweet(tweet_create_event.text)) continue
    handle_mentions(tweet_create_event.id_str)
  }
}

const validate_tweet = async (tweet: string) => {
  if (tweet.startsWith('RT')) return false
  if (tweet.indexOf(commands.render) === -1) return false
  if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(commands.render)) return false
  return true
}

const handle_mentions = async (in_reply_to_status_id: string) => {
  const tweet = await twitter_client.get_tweet_text(in_reply_to_status_id)
  const tweet_without_command = tweet.slice(tweet.indexOf(commands.render) + commands.render.length)
  const filtered_tweet = tweet_without_command.slice(0, tweet_without_command.indexOf('http')).trim()

  if (!filtered_tweet) {
    await twitter_client.reply('You have not provided any valid LaTeX.', in_reply_to_status_id)
    return
  }

  await reply_with_latex(filtered_tweet, in_reply_to_status_id)
}

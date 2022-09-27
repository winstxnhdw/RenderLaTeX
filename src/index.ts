import render_webp_latex from '@/render'
import { commands } from '@/bot'
import { twitter_client, twitter_activity } from '@/libs/Twitter'
import serverless from 'serverless-http'

twitter_activity.set_event('tweet_create_events', (event) => {
  for (const tweet_create_event of event.tweet_create_events) {
    if (!validate_tweet(tweet_create_event.text)) continue
    handle_mentions(tweet_create_event.id_str)
  }
})

function validate_tweet(tweet: string) {
  if (tweet.startsWith('RT')) return false
  if (tweet.indexOf(commands.render) === -1) return false
  if (!tweet.slice(tweet.indexOf(' ') + 1).startsWith(commands.render)) return false
  return true
}

async function handle_mentions(in_reply_to_status_id: string) {
  const tweet = await twitter_client.get_tweet_text(in_reply_to_status_id)
  const tweet_without_command = tweet.slice(tweet.indexOf(commands.render) + commands.render.length)
  const filtered_tweet = tweet_without_command.slice(0, tweet_without_command.indexOf('http')).trim()

  if (!filtered_tweet) {
    await twitter_client.reply('You have not provided any valid LaTeX.', in_reply_to_status_id)
    return
  }

  const webp_buffer = render_webp_latex(filtered_tweet)
  await twitter_client.reply_with_media('#LaTeX', in_reply_to_status_id, webp_buffer, {
    mimeType: 'image/webp'
  })
}

const app = await twitter_activity.init_serverless_app('https://3a22-116-86-178-191.ngrok.io')
export const handler = serverless(app)

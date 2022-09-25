import render_webp_latex from '@/render'
import { commands } from '@/bot'
import { twitter_client, twitter_activity } from '@/libs/Twitter/index'
import { isExpectEventType } from 'twict'
import serverless from 'serverless-http'

twitter_activity.onEvent((event) => {
  if (!isExpectEventType(event, 'tweet_create_events')) return
  
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
  const tweet_lookup_result = await twitter_client.v2.tweets([in_reply_to_status_id])
  const tweet = tweet_lookup_result.data[0]?.text!
  const tweet_without_command = tweet.slice(tweet.indexOf(commands.render) + commands.render.length)
  const filtered_tweet = tweet_without_command.slice(0, tweet_without_command.indexOf('http')).trim()

  if (!filtered_tweet) {
    await twitter_client.v2.reply('You have not provided any valid LaTeX.', in_reply_to_status_id)
    return
  }

  const webp_buffer = render_webp_latex(filtered_tweet)
  const media_id = await twitter_client.v1.uploadMedia(webp_buffer, {
    mimeType: 'image/webp'
  })

  await twitter_client.v2.reply('#LaTeX', in_reply_to_status_id, {
    media: {
      media_ids: [media_id]
    }
  })
}

async function main() {
  const app = await twitter_activity.listen(8000)
  await twitter_activity.deleteAllWebhooks()
  await twitter_activity.registerWebhook('https://3a22-116-86-178-191.ngrok.io')
  await twitter_activity.subscribe()

  return serverless(app)
}

export const handler = main()

// Remove later
// Bot.start()

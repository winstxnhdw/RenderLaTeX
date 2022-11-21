import { render_webp_latex } from '@/render'
import { get_random_element } from '@/helpers'
import type { TwitterClient } from '@/libs/Twitter/TwitterClient'

const reply_texts = ['#LaTeX', '#Mathematics', '#Math']

const replace_html_special_chars = (tweet: string): string =>
  tweet.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

export const reply_with_latex = async (twitter_client: TwitterClient, tweet: string, in_reply_to_status_id: string) => {
  const reply_text = get_random_element(reply_texts)
  const clean_tweet = replace_html_special_chars(tweet)
  const webp_buffer = render_webp_latex(clean_tweet)

  await twitter_client.reply_with_media(reply_text, in_reply_to_status_id, webp_buffer, {
    mimeType: 'image/webp'
  })
}

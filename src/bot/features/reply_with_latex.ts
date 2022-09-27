import { twitter_client } from '@/libs/Twitter'
import { render_webp_latex } from '@/render'
import { get_random_element } from '@/helpers'

const reply_texts = ['#LaTeX', '#Mathematics', '#Math']

export const reply_with_latex = async (tweet: string, in_reply_to_status_id: string) => {
  const reply_text = get_random_element(reply_texts)
  const webp_buffer = render_webp_latex(tweet)

  await twitter_client.reply_with_media(reply_text, in_reply_to_status_id, webp_buffer, {
    mimeType: 'image/webp'
  })
}

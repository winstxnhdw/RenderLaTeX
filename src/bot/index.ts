import TwitterApi from 'twitter-api-v2'
// import config from '@/config'
import mathjax_to_svg from '@/libs/mathjax'
import svg_to_webp from '@/libs/canvas'

// const user_client = new TwitterApi({
//   appKey: config.TWITTER_API_KEY,
//   appSecret: config.TWITTER_API_SECRET,
//   accessToken: config.TWITTER_OAUTH_TOKEN,
//   accessSecret: config.TWITTER_OAUTH_TOKEN_SECRET
// })

export default class Bot {
  static start() {
    const svg_object = mathjax_to_svg(`\\frac{x}{2} + x + x + x + x + x + x + x + x + x + x + x`)
    const webp_buffer = svg_to_webp(svg_object, {
      svg: {
        width: 1100,
        height: 600
      },
      canvas: {
        width: 1200,
        height: 675
      }
    })
  }
}

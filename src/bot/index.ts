import TwitterApi from 'twitter-api-v2'
import config from '@/config'
import mathjax_to_svg from '@/mathjax'

const user_client = new TwitterApi({
  appKey: config.TWITTER_APP_KEY,
  appSecret: config.TWITTER_APP_SECRET
})

export default class Bot {
  static init() {
    console.log(
      mathjax_to_svg(`
f_a =
\\begin{cases}
    f_i + 125n, & \\text{if}\\ n=0 \\\\
    f_i + 125n, & \\text{if}\\ n=1 \\\\
    f_i + 125n, & \\text{if}\\ n=2 \\\\
    f_i + 125n, & \\text{if}\\ n=3
\\end{cases}
,`)
    )
  }
}

// import TwitterApi from 'twitter-api-v2'
// import config from '@/config'
import mathjax_to_svg from '@/libs/mathjax'

// const user_client = new TwitterApi({
//   appKey: config.TWITTER_APP_KEY,
//   appSecret: config.TWITTER_APP_SECRET
// })

export default class Bot {
  static start() {
    console.log(mathjax_to_svg(`\\frac{x}{2}`))
  }
}

// import TwitterApi from 'twitter-api-v2'
// import config from '@/config'
import mathjax_to_svg from '@/libs/mathjax'
import svg_to_webp from '@/libs/canvas'
import * as fs from 'fs'

// const user_client = new TwitterApi({
//   appKey: config.TWITTER_APP_KEY,
//   appSecret: config.TWITTER_APP_SECRET
// })

export default class Bot {
  static start() {
    const svg = mathjax_to_svg(`\\frac{x}{2}`)
    const webp = svg_to_webp(svg)
    fs.writeFile('test.webp', webp, (err) => {
      if (!err) console.log('success')
    })
  }
}

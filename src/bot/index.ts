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

    fs.writeFile('test.webp', webp_buffer, (err) => {
      if (!err) console.log('success')
    })
  }
}

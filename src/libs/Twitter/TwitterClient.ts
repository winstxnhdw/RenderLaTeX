import { TwitterApi } from 'twitter-api-v2'
import type { SendTweetV2Params, TwitterApiTokens, TwitterApiv1, TwitterApiv2 } from 'twitter-api-v2'

type MediaOptions = {
  mimeType: string
}

export class TwitterClient {
  private readonly client_v1: TwitterApiv1
  private readonly client_v2: TwitterApiv2

  constructor(tokens: TwitterApiTokens) {
    const client = new TwitterApi(tokens)
    this.client_v1 = client.v1
    this.client_v2 = client.v2
  }

  async get_tweet_text(tweet_id: string): Promise<string> {
    console.log(tweet_id)
    const tweet_lookup_result = await this.client_v2.tweets([tweet_id])
    console.log(tweet_lookup_result)
    const tweet = tweet_lookup_result.data[0]
    if (!tweet) throw new Error('Tweet does not exist.')

    return tweet.text
  }

  async reply(text: string, in_reply_to_status_id: string, options?: Partial<SendTweetV2Params>) {
    const replyResult = await this.client_v2.reply(text, in_reply_to_status_id, options)
    return replyResult
  }

  async reply_with_media(text: string, in_reply_to_status_id: string, media: Buffer, options: MediaOptions) {
    const media_id = await this.client_v1.uploadMedia(media, options)
    const replyResult = this.reply(text, in_reply_to_status_id, {
      media: {
        media_ids: [media_id]
      }
    })

    return replyResult
  }
}

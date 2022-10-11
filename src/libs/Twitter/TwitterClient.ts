import { TwitterApi } from 'twitter-api-v2'
import type { SendTweetV2Params, TwitterApiTokens, TwitterApiv1, TwitterApiv2, TweetV1 } from 'twitter-api-v2'

type MediaOptions = {
  mimeType: string
}

class TweetNotFound extends Error {
  constructor(tweet_id: string | number) {
    super(`Tweet ${tweet_id} does not exist.`)
  }
}

export class TwitterClient {
  private readonly client: TwitterApi
  private readonly client_v1: TwitterApiv1
  private readonly client_v2: TwitterApiv2

  constructor(tokens: TwitterApiTokens) {
    this.client = new TwitterApi(tokens)
    this.client_v1 = this.client.v1
    this.client_v2 = this.client.v2
  }

  get internal() {
    return this.client
  }

  async get_username() {
    const me = await this.client_v2.me()
    return me.data.username
  }

  async get_tweet(tweet_id: string): Promise<TweetV1> {
    const tweet = await this.client_v1.singleTweet(tweet_id)
    if (!tweet) throw new TweetNotFound(tweet_id)

    return tweet
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

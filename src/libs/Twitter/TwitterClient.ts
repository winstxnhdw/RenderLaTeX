import type {
  SendTweetV2Params,
  TweetV1,
  TweetV2PostTweetResult,
  TwitterApiTokens,
  TwitterApiv1,
  TwitterApiv2
} from 'twitter-api-v2'
import { TwitterApi } from 'twitter-api-v2'

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

  get internal(): TwitterApi {
    return this.client
  }

  async get_username(): Promise<string> {
    const me = await this.client_v2.me()
    return me.data.username
  }

  async get_tweet(tweet_id: string): Promise<TweetV1> {
    const tweet = await this.client_v1.singleTweet(tweet_id)
    if (!tweet) throw new TweetNotFound(tweet_id)

    return tweet
  }

  async reply(
    text: string,
    in_reply_to_status_id: string,
    options?: Partial<SendTweetV2Params>
  ): Promise<TweetV2PostTweetResult> {
    const replyResult = await this.client_v2.reply(text, in_reply_to_status_id, options)
    return replyResult
  }

  async reply_with_media(
    text: string,
    in_reply_to_status_id: string,
    media: Buffer,
    options: MediaOptions
  ): Promise<TweetV2PostTweetResult> {
    const media_id = await this.client_v1.uploadMedia(media, options)

    return this.reply(text, in_reply_to_status_id, {
      media: {
        media_ids: [media_id]
      }
    })
  }
}

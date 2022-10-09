export const get_tweet_without_handle = (tweet: string, username: string): string => {
  const user_handle = `@${username}`
  return !tweet.includes(user_handle) ? tweet : tweet.slice(tweet.lastIndexOf(user_handle) + user_handle.length).trim()
}

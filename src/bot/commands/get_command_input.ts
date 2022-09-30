export const get_command_input = (tweet: string, command: string): string => {
  const tweet_without_command = tweet.slice(tweet.indexOf(command) + command.length)

  return tweet_without_command.includes('http')
    ? tweet_without_command.slice(0, tweet_without_command.indexOf('http')).trim()
    : tweet_without_command.trim()
}

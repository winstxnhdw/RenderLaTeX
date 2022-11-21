export const get_command_input = (tweet: string, command: string): string => {
  const tweet_without_command = tweet.slice(tweet.toLowerCase().indexOf(command) + command.length)

  const input = tweet_without_command.includes('http')
    ? tweet_without_command.slice(0, tweet_without_command.indexOf('http'))
    : tweet_without_command

  return input.trim()
}

export const remove_mentions = (tweet: string): string => tweet.replace(/@\S+/g, '').trim()

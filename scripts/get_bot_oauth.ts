import { config } from '@/config'
import readline from 'readline/promises'

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const developer_url = `https://twitter.com/oauth/request_token?oauth_consumer_key=${config.TWITTER_API_KEY}&oauth_callback=oob`
  console.log(`[!] Login to your *DEVELOPER* account and visit this URL:\n${developer_url}`)

  const oauth_token = await rl.question(`[?] Enter the OAuth token: `)
  const bot_url = `https://twitter.com/oauth/authenticate?oauth_token=${oauth_token}`
  console.log(`[!] Login to your *BOT* account and visit this URL:\n${bot_url}`)

  const pin = await rl.question('[?] Enter the PIN: ')
  const response = await fetch(
    `https://twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${pin}`,
    {
      method: 'POST'
    }
  )

  console.log('[*] Your OAuth tokens are:')
  const oauth_tokens = await response.text()

  for (const token of oauth_tokens.split('&').slice(0, 2)) {
    console.log(token)
  }
}

main()

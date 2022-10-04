import { start } from '@/bot'
import serverless from 'serverless-http'

async function main() {
  const app = await start('https://c37b-116-86-178-191.ngrok.io')
  exports.handler = serverless(app)
}

main()

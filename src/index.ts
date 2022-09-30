import { start } from '@/bot'
import serverless from 'serverless-http'

async function main() {
  return await start('https://c37b-116-86-178-191.ngrok.io')
}

main()
// export const handler = serverless(main())

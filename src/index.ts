import { start } from '@/bot'
import serverless from 'serverless-http'

const app = await start('https://3a22-116-86-178-191.ngrok.io')
export const handler = serverless(app)

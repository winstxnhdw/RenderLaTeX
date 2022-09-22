import type { Canvas } from 'canvas'

interface WebpConfig {
  lossless: boolean
  quality: number
}

declare module 'canvas' {
  export default interface CanvasWebp extends Canvas {
    toBuffer(mimeType: 'image/webp', config?: WebpConfig): Buffer
  }
}

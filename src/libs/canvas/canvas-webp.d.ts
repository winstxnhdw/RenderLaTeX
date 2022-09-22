import 'canvas'

declare module 'canvas' {
  interface WebpConfig {
    lossless: boolean
    quality: number
  }

  export interface CanvasWebp extends Canvas {
    toBuffer(mimeType: 'image/webp', config?: WebpConfig): Buffer
  }

  export function createCanvas(width: number, height: number, type?: 'pdf' | 'svg'): CanvasWebp
}

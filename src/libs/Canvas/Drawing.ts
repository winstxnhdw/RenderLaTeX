import type { Canvas } from '@napi-rs/canvas'

export class Drawing {
  private readonly canvas: Canvas

  constructor(canvas: Canvas) {
    this.canvas = canvas
  }

  to_webp(): Buffer {
    return this.canvas.toBuffer('image/webp')
  }
}

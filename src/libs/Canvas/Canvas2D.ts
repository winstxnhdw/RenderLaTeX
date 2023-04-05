import { Drawing } from '@/libs/Canvas/Drawing'
import type { Resolution } from '@/types'
import type { Canvas, SKRSContext2D } from '@napi-rs/canvas'
import { createCanvas, Image } from '@napi-rs/canvas'

const image = new Image()

export class Canvas2D {
  private readonly canvas: Canvas
  private readonly context: SKRSContext2D

  constructor(resolution: Resolution) {
    this.canvas = createCanvas(resolution.width, resolution.height)
    this.context = this.canvas.getContext('2d')
  }

  get width(): number {
    return this.canvas.width
  }

  get height(): number {
    return this.canvas.height
  }

  draw(buffer: Buffer, offset_x = 0, offset_y = 0): Drawing {
    image.src = buffer
    this.context.drawImage(image, offset_x, offset_y)

    return new Drawing(this.canvas)
  }
}

import { createCanvas, Image } from '@napi-rs/canvas'
import type ScalableVectorObject from '@/libs/MathJax/ScalableVectorObject'
import type { Resolution } from '@/types'

type VectorToCanvasOptions = {
  svg: Resolution
  canvas: Resolution
}

const create_canvas = (resolution: Resolution) => createCanvas(resolution.width, resolution.height)
const image = new Image()

export default function svg_to_webp(svg: ScalableVectorObject, options: VectorToCanvasOptions): Buffer {
  svg.set_resolution(options.svg)
  image.src = Buffer.from(svg.to_string())

  const canvas = create_canvas(options.canvas)
  const ctx = canvas.getContext('2d')
  const height_offset = 0.5 * (canvas.height - svg.height)
  const width_offset = 0.5 * (canvas.width - svg.width)
  ctx.drawImage(image, width_offset, height_offset)

  return canvas.toBuffer('image/webp')
}

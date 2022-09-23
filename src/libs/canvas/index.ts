import { createCanvas, Image } from 'canvas'
import '@/plugins/canvas-webp'
import type { ScalableVectorObject } from '@/libs/mathjax'

interface Resolution {
  width: number
  height: number
}
interface VectorToCanvasOptions {
  svg: Resolution
  canvas: Resolution
}

const create_canvas = (resolution: Resolution) => createCanvas(resolution.width, resolution.height)

const image = new Image()
image.onerror = (err) => {
  throw err
}

export default function svg_to_webp(svg: ScalableVectorObject, options: VectorToCanvasOptions): Buffer {
  svg.set_resolution(options.svg)
  const canvas = create_canvas(options.canvas)
  const ctx = canvas.getContext('2d')

  image.onload = () => {
    const height_offset = 0.5 * (canvas.height - svg.height)
    const width_offset = 0.5 * (canvas.width - svg.width)
    ctx.drawImage(image, width_offset, height_offset)
  }

  image.src = `data:image/svg+xml;charset=utf-8,${svg.to_string()}`
  return canvas.toBuffer('image/webp')
}

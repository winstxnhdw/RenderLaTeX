import { createCanvas, Image } from 'canvas'
import '@/plugins/canvas-webp'

const canvas = createCanvas(1000, 1000)
const ctx = canvas.getContext('2d')

const img = new Image()
img.onload = () => ctx.drawImage(img, 0, 0)
img.onerror = (err) => {
  throw err
}

export default function svg_to_webp(svg: string) {
  img.src = `data:image/svg+xml;charset=utf-8,${svg}`
  return canvas.toBuffer('image/webp')
}

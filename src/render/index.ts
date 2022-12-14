import { Canvas2D } from '@/libs/Canvas'
import { MathJaxSVG } from '@/libs/MathJax'
import type { Resolution } from '@/types'

const MediaSettings = {
  width: 1200,
  height: 675,
  padding: 0.1
}

const mathjax_to_svg = (mathjax_input: string, resolution: Resolution): MathJaxSVG => {
  const mathjax_svg = new MathJaxSVG(mathjax_input)
  mathjax_svg.set_resolution(resolution)

  return mathjax_svg
}

const svg_to_webp = (svg: MathJaxSVG): Buffer => {
  const canvas = new Canvas2D({ width: MediaSettings.width, height: MediaSettings.height })
  const offset_x = 0.5 * (canvas.width - svg.width)
  const offset_y = 0.5 * (canvas.height - svg.height)

  return canvas.draw(svg.to_buffer(), offset_x, offset_y).to_webp()
}

export const render_webp_latex = (mathjax: string): Buffer => {
  const svg_object = mathjax_to_svg(mathjax, {
    width: (1 - MediaSettings.padding) * MediaSettings.width,
    height: (1 - MediaSettings.padding) * MediaSettings.height
  })

  return svg_to_webp(svg_object)
}

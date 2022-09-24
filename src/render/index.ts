import mathjax_to_svg from '@/libs/mathjax'
import svg_to_webp from '@/libs/canvas'

export default function render_webp_latex(mathjax: string) {
  const svg_object = mathjax_to_svg(mathjax)
  const webp_buffer = svg_to_webp(svg_object, {
    svg: {
      width: 1100,
      height: 600
    },
    canvas: {
      width: 1200,
      height: 675
    }
  })

  return webp_buffer
}

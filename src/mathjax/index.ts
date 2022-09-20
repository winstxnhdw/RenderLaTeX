import { mathjax } from 'mathjax-full/ts/mathjax'
import { TeX } from 'mathjax-full/ts/input/tex'
import { SVG } from 'mathjax-full/ts/output/svg'
import { liteAdaptor } from 'mathjax-full/ts/adaptors/liteAdaptor'
import { AllPackages } from 'mathjax-full/ts/input/tex/AllPackages'

const adaptor = liteAdaptor()
const tex = new TeX({ packages: AllPackages.join(', ').split(/\s*,\s*/) })
const svg = new SVG({ fontCache: 'local' })
const mathjax_document = mathjax.document('', { InputJax: tex, OutputJax: svg })

const mathjax_options = {
  em: 16,
  ex: 8,
  containerWidth: 1280
}

export default function get_mathjax_svg(math: string) {
  const node = mathjax_document.convert(math, mathjax_options)
  return adaptor.innerHTML(node)
}

import { mathjax } from 'mathjax-full/js/mathjax'
import { TeX } from 'mathjax-full/js/input/tex'
import { SVG } from 'mathjax-full/js/output/svg'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html'
import type { LiteElement, LiteAttributeList } from 'mathjax-full/js/adaptors/lite/Element'
import type { LiteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'

export class ScalableVectorObject {
  node: LiteElement
  adaptor: LiteAdaptor

  constructor(node: LiteElement, adaptor: LiteAdaptor) {
    this.node = node
    this.adaptor = adaptor
  }

  private get attributes(): LiteAttributeList {
    return (this.node.children[0] as LiteElement).attributes
  }

  get width(): number {
    return Number(this.attributes['width'])
  }

  get height(): number {
    return Number(this.attributes['height'])
  }

  set_resolution(resolution: { width: number; height: number }) {
    this.attributes['width'] = resolution.width.toString()
    this.attributes['height'] = resolution.height.toString()
  }

  to_string(): string {
    return this.adaptor.innerHTML(this.node)
  }
}

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)

const mathjax_document = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'local' })
})

export default function mathjax_to_svg(mathjax_input: string): ScalableVectorObject {
  const node: LiteElement = mathjax_document.convert(mathjax_input)
  return new ScalableVectorObject(node, adaptor)
}

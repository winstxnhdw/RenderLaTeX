import type { Resolution } from '@/types'
import type { LiteAttributeList, LiteElement } from 'mathjax-full/js/adaptors/lite/Element'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html'
import { TeX } from 'mathjax-full/js/input/tex'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { mathjax } from 'mathjax-full/js/mathjax'
import { SVG } from 'mathjax-full/js/output/svg'

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)

const mathjax_document = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'local' })
})

export class MathJaxSVG {
  private readonly node: LiteElement

  constructor(mathjax_input: string) {
    this.node = mathjax_document.convert(mathjax_input) as LiteElement
  }

  private get attributes(): LiteAttributeList {
    const lite_element = this.node.children[0] as LiteElement
    return lite_element.attributes
  }

  get width(): number {
    const width = this.attributes['width'] as string
    return Number(width)
  }

  get height(): number {
    const height = this.attributes['height'] as string
    return Number(height)
  }

  set_resolution(resolution: Resolution) {
    this.attributes['width'] = resolution.width.toString()
    this.attributes['height'] = resolution.height.toString()
  }

  to_string(): string {
    return adaptor.innerHTML(this.node)
  }

  to_buffer(): Buffer {
    return Buffer.from(this.to_string())
  }
}

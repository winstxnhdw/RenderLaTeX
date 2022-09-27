import type { LiteElement, LiteAttributeList } from 'mathjax-full/js/adaptors/lite/Element'
import type { LiteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import type { Resolution } from '@/types'

export default class ScalableVectorObject {
  private node: LiteElement
  private adaptor: LiteAdaptor

  constructor(node: LiteElement, adaptor: LiteAdaptor) {
    this.node = node
    this.adaptor = adaptor
  }

  private get attributes(): LiteAttributeList {
    const lite_element = this.node.children[0] as LiteElement
    return lite_element.attributes
  }

  get width(): number {
    const width = this.attributes['width']
    return Number(width)
  }

  get height(): number {
    const height = this.attributes['height']
    return Number(height)
  }

  set_resolution(resolution: Resolution) {
    this.attributes['width'] = resolution.width.toString()
    this.attributes['height'] = resolution.height.toString()
  }

  to_string(): string {
    return this.adaptor.innerHTML(this.node)
  }
}

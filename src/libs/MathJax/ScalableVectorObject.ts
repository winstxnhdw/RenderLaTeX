import type { LiteElement, LiteAttributeList } from 'mathjax-full/js/adaptors/lite/Element'
import type { LiteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'

export default class ScalableVectorObject {
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

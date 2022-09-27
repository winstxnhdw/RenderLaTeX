import { MathJaxSVG } from '@/libs/MathJax'
import { expect } from 'chai'

describe('mathjax_to_svg', () => {
  it('It should return a valid SVG when given a valid string', () =>
    expect(new MathJaxSVG('x').to_string()).to.match(/^<svg/))
})

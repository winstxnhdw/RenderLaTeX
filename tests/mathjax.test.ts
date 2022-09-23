import mathjax_to_svg from '@/libs/mathjax'
import { expect } from 'chai'

describe('mathjax_to_svg', () => {
  it('It should return a valid SVG', () => expect(mathjax_to_svg('x').to_string()).to.match(/^<svg/))
})

import svg_to_webp from '@/libs/canvas'
import mathjax_to_svg from '@/libs/mathjax'
import { writeFile, unlink } from 'fs'
import { expect } from 'chai'

describe('svg_to_webp', () => {
  it('It should return a valid file buffer', () => {
    const webp_buffer = svg_to_webp(mathjax_to_svg('x'), {
      svg: {
        width: 1100,
        height: 600
      },
      canvas: {
        width: 1200,
        height: 675
      }
    })

    expect(() => {
      writeFile('test.webp', webp_buffer, (err) => {
        if (err) throw err
        unlink('test.webp', (err) => {
          if (err) throw err
        })
      })
    }).to.not.throw()
  })
})

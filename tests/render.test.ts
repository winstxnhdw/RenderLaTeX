import { render_webp_latex } from '@/render/index'
import { writeFile, unlink } from 'fs'
import { expect } from 'chai'

describe('render_webp_latex', () => {
  it('It should return a valid file buffer', () => {
    expect(() => {
      writeFile('test.webp', render_webp_latex('x'), (err) => {
        if (err) throw err
        unlink('test.webp', (err) => {
          if (err) throw err
        })
      })
    }).to.not.throw()
  })
})

import get_mathjax_svg from '@/mathjax'

export default function bot() {
  console.log(
    get_mathjax_svg(`
f_a =
\\begin{cases}
    f_i + 125n, & \\text{if}\\ n=0 \\\\
    f_i + 125n, & \\text{if}\\ n=1 \\\\
    f_i + 125n, & \\text{if}\\ n=2 \\\\
    f_i + 125n, & \\text{if}\\ n=3
\\end{cases}
,`)
  )
}

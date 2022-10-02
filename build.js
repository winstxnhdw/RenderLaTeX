const fs = require('fs/promises')
const { build } = require('esbuild')

const build_directory = 'dist'
const external_modules = ['@napi-rs']

async function main(args) {
  await fs.rm(build_directory, { recursive: true })
  await fs.mkdir(build_directory)

  for (const module of external_modules) {
    await fs.cp(`node_modules/${module}`, `${build_directory}/node_modules/${module}`, {
      recursive: true
    })
  }

  await build({
    entryPoints: ['src/index.ts'],
    outfile: `${build_directory}/index.js`,
    bundle: true,
    minify: args.slice(2)[0] !== 'test',
    platform: 'node',
    tsconfig: 'tsconfig.build.json',
    external: external_modules
  })
}

main(process.argv)

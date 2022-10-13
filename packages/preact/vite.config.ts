import { resolve } from 'path'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import preact from '@preact/preset-vite'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    preact(),
    dts({ insertTypesEntry: true }),
    banner(
      `/**\n * name: ${name}` +
        `\n * version: ${version}` +
        `\n * author: ${author.name} (${author.url})` +
        `\n * homepage: ${homepage}` +
        `\n * license ${license}\n */`
    )],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'Fireworks',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [
        'preact/compat',
        'preact/hooks',
        'fireworks-js'
      ],
      output: {
        exports: 'named',
        globals: {
          'preact/compat': 'PreactCompat',
          'preact/hooks': 'PreactHooks',
          'fireworks-js': 'Fireworks'
        }
      }
    }
  }
})

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import alias from '@rollup/plugin-alias'
import {resolve} from 'path'

export default defineConfig({
  build: {
    // 参考：https://cn.vitejs.dev/config/build-options.html#build-lib
    lib: {
      // 构建的入口文件
      entry: './src/index.ts',
      // formats: ['es', 'umd'] 默认值
      // 当产物为 umd、iife 格式时，该模块暴露的全局变量名称
      name: 'VidetorRenderer',
      // 产物文件名称
      // fileName: 'videtor-renderer',
    },
    // rollupOptions: {
    //   external: ['mitt']
    // },
    // 为了方便查看构建产物，不要混淆产物代码
    minify: false,
  },
  plugins: [alias(), dts({ rollupTypes: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
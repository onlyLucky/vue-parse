/*
 * @Author: fg
 * @Date: 2022-07-04 13:59:48
 * @LastEditors: fg
 * @LastEditTime: 2022-07-04 14:36:10
 * @Description: content
 */
import {
  defineConfig
} from 'vite'
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path'

export default defineConfig({
  // 项目根目录
  root: process.cwd(),
  // 项目部署的基础路径
  base: '/',
  // 环境配置
  mode: 'development',
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    }),
    
    resolve()
  ],
  build: {
    // 浏览器兼容性 ‘esnext’ | 'modules'
    target: 'modules',
    //输出路径
    outDir: '../dist',
    // 生成静态资源的存放路径
    assetsDir: '../assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的http请求， 设置为 0, 可以完全禁用此项，
    assetsInlineLimit: 4096,
    // 启动 / 禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 soutrce map 文件
    sourcemap: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, 'src/index.html'),
        page: path.resolve(__dirname, 'src/page/index.html'),
        index: path.resolve(__dirname, 'src/index/index.html'),
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 500,
    // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。
    emptyOutDir: true
  }
})
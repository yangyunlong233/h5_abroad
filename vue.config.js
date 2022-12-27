const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assests',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.108.226.108:8131',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/v1/tcz/'
        }
      }
    }
  }
})

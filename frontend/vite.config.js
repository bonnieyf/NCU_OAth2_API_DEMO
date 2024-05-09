import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 指向後端服務地址
        changeOrigin: true,  // 需要虛擬主機站點
        rewrite: (path) => path.replace(/^\/api/, '')  // 重寫 API 請求
      }
    }
  }
})

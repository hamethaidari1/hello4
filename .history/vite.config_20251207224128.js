import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // 💡 پورت جدید را اینجا مشخص کنید
    port: 8080, 
    proxy: {
      '/api': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});

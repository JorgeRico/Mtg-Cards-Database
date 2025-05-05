import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
          { find: "@layouts", replacement: "/src/layouts" },
          { find: "@assets", replacement: "/src/assets" },
          { find: "@components", replacement: "/src/components" }
        ]
    },
})
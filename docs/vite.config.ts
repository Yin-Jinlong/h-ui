import path from 'path'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 1234,
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '@pages': path.resolve('src/pages'),
            '@components': path.resolve('src/components'),
            '@types': path.resolve('src/types'),
            '@yin-jinlong/h-ui/style/src': path.resolve('../packages/style'),
            '@yin-jinlong/h-ui': path.resolve('../packages'),
        }
    },
    optimizeDeps: {
        include: ['@yin-jinlong/h-ui']
    },
    plugins: [
        vue(),
    ],
});

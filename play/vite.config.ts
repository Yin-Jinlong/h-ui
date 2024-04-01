import path from 'path'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4466,
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '@pages': path.resolve('src/pages'),
            'components': path.resolve('../packages/components'),
            '@yin-jinlong/h-ui': path.resolve('../packages'),
            '@yin-jinlong/h-ui/style/src': path.resolve('../packages/style'),
        }
    },
    optimizeDeps: {
        include: ['@yin-jinlong/h-ui']
    },
    plugins: [
        vue(),
    ],
});

import path from 'path'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

function getSuffix(name: string) {
    const i = name.lastIndexOf('.')
    return i >= 0 ? name.substring(i + 1) : name
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
    const prod = env.mode === 'production'
    return {
        base: './',
        server: {
            port: 1234,
        },
        build: {
            minify: 'terser',
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    format: 'esm',
                    preserveModules: false,
                    assetFileNames(chunkInfo) {
                        switch (getSuffix(chunkInfo.name!)) {
                            case 'css':
                                return 'css/[name].css'
                            default:
                                return '[name].[ext]'
                        }
                    },
                    entryFileNames: '[name].js',
                    chunkFileNames: 'js/[name].js'
                }
            }
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
            vue({
                isProduction: prod
            }),
        ],
    }
});

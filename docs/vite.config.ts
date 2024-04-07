import path from 'path'

import {defineConfig} from 'vite'
import {visualizer} from "rollup-plugin-visualizer"
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

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
            cssCodeSplit: true,
            cssMinify: 'lightningcss',
            chunkSizeWarningLimit: 1024,
            terserOptions: {
                format: {
                    comments: false
                }
            },
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    compact: true,
                    format: 'esm',
                    preserveModules: false,
                    assetFileNames(chunkInfo) {
                        switch (getSuffix(chunkInfo.name!)) {
                            case 'css':
                                return 'css/[hash].css'
                            default:
                                return '[hash].[ext]'
                        }
                    },
                    entryFileNames: '[name].js',
                    chunkFileNames: 'js/[hash].js',
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
            entries: ['@yin-jinlong/h-ui']
        },
        plugins: [
            vue({
                isProduction: prod
            }),
            viteCompression({
                threshold: 32 * 1024
            }),
            visualizer({
                gzipSize: true,
                template: 'flamegraph',
                filename: 'cache/sizes.html'
            })
        ],
    }
});

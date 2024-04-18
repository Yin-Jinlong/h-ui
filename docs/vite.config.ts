import path from 'path'

import {defineConfig} from 'vite'
import {visualizer} from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'

import {pressPlugin, indexesPlugin, pressCodePlugin} from './.press/plugin'

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
                '@': path.resolve('.press'),
                '@pages': path.resolve('.press/pages'),
                '@components': path.resolve('.press/components'),
                '@types': path.resolve('.press/types'),
                '@yin-jinlong/h-ui/style/src': path.resolve('../packages/style'),
                '@yin-jinlong/h-ui': path.resolve('../packages'),
            }
        },
        optimizeDeps: {
            entries: ['@yin-jinlong/h-ui']
        },
        plugins: [
            pressPlugin({
                setupFile:'.press/setup.ts',
                importsMap: {
                    '@pages/app':['App']
                }
            }),
            pressCodePlugin(),
            indexesPlugin(),
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
})

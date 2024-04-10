import path from 'path'

import {defineConfig, UserConfig} from 'vitest/config'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vuePlugin()],
    resolve: {
        alias: {
            '@yin-jinlong/h-ui/style/src': path.resolve('style'),
            '@yin-jinlong/h-ui': path.resolve('.'),
        }
    },
    test: {
        name: 'h-ui-packages',
        environment: 'happy-dom',
        api: 4444,
    },
} as UserConfig)


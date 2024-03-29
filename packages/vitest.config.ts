import {defineConfig, UserConfig} from 'vitest/config'

export default defineConfig({
    test: {
        name: 'h-ui-packages',
        environment: 'happy-dom',
        api:4444,
    },
} as UserConfig)


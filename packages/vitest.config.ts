import {defineConfig, UserConfig} from 'vitest/config'
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vuePlugin()],
    test: {
        name: 'h-ui-packages',
        environment: 'happy-dom',
        api:4444,
    },
} as UserConfig)


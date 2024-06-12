import type {Component} from 'vue'
import Base64 from 'js-base64'

declare global {

    declare interface Window {
        Base64: Base64

    }

    declare module 'indexes~' {
        import type {Component} from 'vue'

        interface Page {
            name: string
            path: string
            component: () => Promise<{ default: Component }>
        }

        const components: Page[]
        export default components

        export {}
    }

    declare module '*.vue?md' {
        const vue: Component
        export default vue
    }

    declare module '*.vue?code' {
        const dark: string
        const light: string
    }

}

export {}

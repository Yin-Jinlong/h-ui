import {BundledLanguage} from 'shiki'
import type {Component} from 'vue'

declare global {

    interface ThemeEvent extends Event {
        readonly theme: string
    }

    declare interface Window {
        code(code: string, lang: BundledLanguage): string

        addEventListener(event: 'theme-change', listener: (e: ThemeEvent) => void): void
    }

    declare module '*.vue?raw' {
        const src: string
        export default src
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
}

export {}

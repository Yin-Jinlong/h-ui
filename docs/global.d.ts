import {BundledLanguage} from "shiki";

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

}

export {}

import {BundledLanguage} from "shiki";

declare global {

    interface ThemeEvent extends Event {
        readonly theme: string
    }

    function code(code: string, lang: BundledLanguage): Promise<string>

    declare interface Window {
        code(code: string, lang: BundledLanguage): Promise<string>

        addEventListener(event: 'theme-change', listener: (e: ThemeEvent) => void): void
    }

    declare module '*.vue?raw' {
        const src: string
        export default src
    }

}

export {}

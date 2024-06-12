// GlobalComponents for Volar
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        HButton: typeof import('h-ui')['HButton']
        HCard: typeof import('h-ui')['HCard']
        HCheckBox: typeof import('h-ui')['HCheckBox']
        HInput: typeof import('h-ui')['HInput']
        HLoading: typeof import('h-ui')['HLoading']
        HSwitch: typeof import('h-ui')['HSwitch']
    }

}

declare global {
    interface Document {
        readonly startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition
    }

    interface ThemeEvent extends Event {
        readonly theme: 'dark' | 'light' | string
    }

    declare interface Window {

        addEventListener(event: 'theme-change', listener: (e: ThemeEvent) => void): void

    }

    function addEventListener(event: 'theme-change', listener: (e: ThemeEvent) => void): void

    interface ViewTransition {
        readonly finished: Promise<void>
        readonly ready: Promise<void>
        readonly updateCallbackDone: Promise<void>

        skipTransition(): void
    }

}

export {}

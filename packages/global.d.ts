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
        startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition
    }

    interface ViewTransition {
        readonly finished: Promise<void>
        readonly ready: Promise<void>
        readonly updateCallbackDone: Promise<void>

        skipTransition(): void
    }

}

export {}

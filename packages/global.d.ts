// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HButton: typeof import('h-ui/es')['HButton']
  }

  interface ComponentCustomProperties {

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

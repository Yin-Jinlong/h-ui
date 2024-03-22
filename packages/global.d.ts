// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HButton: typeof import('h-ui/es')['HButton']
  }

  interface ComponentCustomProperties {

  }
}

export {}

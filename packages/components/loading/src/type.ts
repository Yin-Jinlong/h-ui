import type {App, Component} from "vue"

export declare interface HLoadingConfig {
    loading: boolean
    text?: string
    component?: Component
}

export declare interface HLoadingOptions extends HLoadingConfig {
    fullscreen?: boolean
    instance?: HLoadingInstance
}

export declare interface HLoadingInstance {
    app?: App<Element>
    options: HLoadingOptions
    parent: HTMLElement
    el: HTMLElement
}

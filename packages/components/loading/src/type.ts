import type {App, Component} from "vue"

type LoadingType = "circle" | "running"

export declare interface HLoadingConfig {
    loading: boolean
    text?: string
    component?: Component | LoadingType
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

export type HLoadingType = LoadingType

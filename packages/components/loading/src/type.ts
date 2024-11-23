import type {App, Component} from 'vue'
import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'

export declare interface HLoadingConfig {
    loading: boolean
    inner: boolean
    text: string
    component: Component | string
    size: string
    width: string
    color: DefinedNamedColor | string
    modal: boolean | DefinedNamedColor | string
}

export declare interface HLoadingOptions extends HLoadingConfig {
    fullscreen: boolean
    instance?: HLoadingInstance
}

export declare interface HLoadingInstance {
    app?: App<Element>
    options: HLoadingOptions
    parent: HTMLElement
    el: HTMLElement
}

export type ComponentFn = (options?: any) => Component

import {Component, ObjectDirective,createApp} from "vue"

import Loading from "./Loading.vue"

import {HLoadingProps} from './props'

const PROPS_KEY = Symbol('props')
const LOADING_KEY = Symbol('loading')

interface LoadingElement extends HTMLElement {
    [PROPS_KEY]: HLoadingProps
    [LOADING_KEY]: boolean
}

export declare interface HLoadingConfig {
    component: Component
    loading: boolean
}

function getLoadingValue(obj: HLoadingConfig | boolean) {
    if (typeof obj === 'boolean') {
        return obj
    } else {
        return obj.loading
    }
}

export const vLoading = {
    mounted(el, binding, vNode) {
        let app = createApp(Loading, {
            loading: binding.value,
            text: el.getAttribute('h-loading-text'),
            component: typeof binding.value === 'object' ? binding.value.component : undefined,
        })
        let e = app.mount(document.createElement('div')).$el
        if (binding.modifiers.fullscreen)
            document.body.append(e)
        else
            el.append(e)
        el[PROPS_KEY] = app._instance!.props as any as HLoadingProps
    },
    updated(el, binding, vNode) {
        el[LOADING_KEY] = getLoadingValue(binding.value)
        el[PROPS_KEY].loading = el[LOADING_KEY]
        el[PROPS_KEY].text = el.getAttribute('h-loading-text') ?? ''
    },
} as ObjectDirective<LoadingElement, HLoadingConfig | boolean>

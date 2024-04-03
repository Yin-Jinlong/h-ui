import {App, Component, ObjectDirective, createApp} from "vue"

import Loading from "./Loading.vue"

import {HLoadingProps} from './props'

const APP_KEY = Symbol('app')
const PROPS_KEY = Symbol('props')
const LOADING_KEY = Symbol('loading')
const EL_KEY = Symbol('el')

interface LoadingElement extends HTMLElement {
    [APP_KEY]: App<Element>
    [PROPS_KEY]: HLoadingProps
    [LOADING_KEY]: boolean
    [EL_KEY]: HTMLElement
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
    created(el, binding, vNode) {
        el[APP_KEY] = createApp(Loading, {
            loading: binding.value,
            text: el.getAttribute('h-loading-text'),
            component: typeof binding.value === 'object' ? binding.value.component : undefined,
        })
    },
    mounted(el, binding, vNode) {
        let c = el[APP_KEY].mount(document.createElement('div'))
        if (binding.modifiers.fullscreen)
            document.body.append(c.$el)
        else
            el.append(c.$el)
        el[EL_KEY] = c.$el
        el[PROPS_KEY] = c.$props as HLoadingProps
    },
    updated(el, binding, vNode) {
        el[LOADING_KEY] = getLoadingValue(binding.value)
        el[PROPS_KEY].loading = el[LOADING_KEY]
        el[PROPS_KEY].text = el.getAttribute('h-loading-text') ?? ''
    },
    unmounted(el, binding, vNode) {
        el[APP_KEY].unmount()
        el[EL_KEY].remove()
    }
} as ObjectDirective<LoadingElement, HLoadingConfig | boolean>

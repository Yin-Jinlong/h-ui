import {App, ObjectDirective, createApp, reactive, DefineComponent, MaybeRef, h, ref, defineComponent} from "vue"

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

export declare interface HLoadingConfig extends HLoadingProps {

}

function getLoadingValue(obj: HLoadingConfig | boolean) {
    if (typeof obj === 'boolean') {
        return obj
    } else {
        return obj.loading
    }
}

function getLoadingText(el: LoadingElement) {
    return el.getAttribute('h-loading-text') ?? ''
}

function updateProps(el: LoadingElement) {
    el[PROPS_KEY].loading = el[LOADING_KEY]
    el[PROPS_KEY].text = getLoadingText(el)
}

export const vLoading = {
    created(el, binding, vNode) {
        el[PROPS_KEY] = reactive<HLoadingProps>({
            loading: getLoadingValue(binding.value ?? true),
            text: getLoadingText(el),
            component: typeof binding.value === 'object' ? binding.value.component : undefined
        })
        el[APP_KEY] = createApp(defineComponent({
            name: 'HLoading',
            setup(_, {expose}) {
                return () => {
                    return h(Loading, el[PROPS_KEY])
                }
            }
        }))
    },
    mounted(el, binding, vNode) {
        let c = el[APP_KEY].mount(document.createElement('div'))
        if (binding.modifiers.fullscreen)
            document.body.append(c.$el)
        else
            el.append(c.$el)
        el[EL_KEY] = c.$el
        el[LOADING_KEY] = getLoadingValue(binding.value ?? true)
        updateProps(el)
    },
    updated(el, binding, vNode) {
        el[LOADING_KEY] = getLoadingValue(binding.value ?? true)
        updateProps(el)
    },
    unmounted(el, binding, vNode) {
        el[APP_KEY].unmount()
    }
} as ObjectDirective<LoadingElement, HLoadingConfig | boolean | undefined>

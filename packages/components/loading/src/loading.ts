import {createApp, DirectiveBinding, ObjectDirective, reactive, watch,} from 'vue'

import {OptionalKey} from '@yin-jinlong/h-ui/types'

import {createLoadingComponent} from './loading-component'
import {HLoadingConfig, HLoadingInstance, HLoadingOptions} from './type'

const INSTANCE_KEY = Symbol('instance')

interface LoadingElement extends HTMLElement {
    [INSTANCE_KEY]: HLoadingInstance
}

function createInstance(el: HTMLElement, options: HLoadingOptions): HLoadingInstance {

    let instance = {
        options,
        parent: options.fullscreen ? document.body : el,
    } as HLoadingInstance

    watch(() => options.loading, (v) => {
        if (v) {
            let app = createApp(createLoadingComponent(el, options))
            let c = app.mount(document.createElement('div'))
            instance.app = app
            instance.el = c.$el
            instance.parent.append(c.$el)
        } else {
            instance.app?.unmount()
            instance.app = undefined
        }
    }, {
        immediate: true
    })
    instance.options.instance = instance
    return instance
}

function resolveOptions(raw: DirectiveBinding<boolean | OptionalKey<HLoadingConfig> | undefined>): HLoadingOptions {

    const def: HLoadingOptions = {
        color: 'primary',
        component: 'circle',
        fullscreen: raw.modifiers.fullscreen ?? false,
        loading: true,
        modal: true,
        size: '30px',
        text: '',
        width: '10%'
    }

    if (typeof raw.value === 'object') {
        return Object.assign(def, raw.value)
    }
    return {
        ...def,
        loading: raw.value ?? true
    }
}

function getLoadingText(el: LoadingElement) {
    return el.getAttribute('h-loading-text') ?? ''
}

function updateProps(el: LoadingElement, options: HLoadingOptions): HLoadingInstance {
    let os = el[INSTANCE_KEY].options as Record<string, any>
    Object.keys(os).forEach(key => {
        let k = key as keyof HLoadingOptions
        let v = options[k]
        if (options[k] !== os[k] && v !== undefined) {
            os[k] = v
        }
    })
    return el[INSTANCE_KEY]
}

function update(el: LoadingElement, binding: DirectiveBinding) {
    let instance = updateProps(el, resolveOptions(binding))
    instance.options.text = getLoadingText(el)
}

export const vLoading = {
    created(el, binding, vNode) {
        el[INSTANCE_KEY] = createInstance(el, reactive(resolveOptions(binding)) as HLoadingOptions)
    },
    mounted: update,
    updated: update,
    unmounted(el, binding, vNode) {
        el[INSTANCE_KEY].app?.unmount()
    }
} as ObjectDirective<LoadingElement, OptionalKey<HLoadingConfig> | boolean | undefined>

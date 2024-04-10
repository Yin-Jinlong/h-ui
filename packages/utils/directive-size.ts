import {ObjectDirective} from 'vue'

export type AutoSizeType = 'auto' | 'max-content'

function getElementAutoWidth(el: HTMLElement, type?: AutoSizeType) {
    let ow = el.clientWidth
    el.style.height = type ?? 'max-content'
    let w = el.clientHeight
    el.style.width = ow + 'px'
    return w
}

function getElementAutoHeight(el: HTMLElement, type?: AutoSizeType) {
    let oh = el.clientHeight
    el.style.height = type ?? 'max-content'
    let h = el.clientHeight
    el.style.height = oh + 'px'
    return h
}

function getElementAutoSize(el: HTMLElement, type?: AutoSizeType) {
    let ow = el.clientWidth
    let oh = el.clientHeight
    el.style.width = type ?? 'max-content'
    el.style.height = type ?? 'max-content'
    let w = el.clientWidth
    let h = el.clientHeight
    el.style.width = ow + 'px'
    el.style.height = oh + 'px'
    return {
        w, h
    }
}

export const vAutoWidth = {
    created(el, binding) {
        const observer = new MutationObserver(() => {
            let w = getElementAutoWidth(el, binding.value)
            setTimeout(() => {
                el.style.height = w + 'px'
            })
        })
        observer.observe(el, {
            childList: true,
            subtree: true,
        })
    },
    mounted(el, binding) {
        getElementAutoHeight(el, binding.value)
    }
} as ObjectDirective<HTMLElement, AutoSizeType | undefined>

export const vAutoHeight = {
    created(el, binding) {
        const observer = new MutationObserver(() => {
            let h = getElementAutoHeight(el, binding.value)
            setTimeout(() => {
                el.style.height = h + 'px'
            })
        })
        observer.observe(el, {
            childList: true,
            subtree: true,
        })
    },
    mounted(el, binding) {
        getElementAutoHeight(el, binding.value)
    }
} as ObjectDirective<HTMLElement, AutoSizeType | undefined>

export const vAutoSize = {
    created(el, binding) {
        const observer = new MutationObserver(() => {
            let {w, h} = getElementAutoSize(el, binding.value)
            setTimeout(() => {
                el.style.width = w + 'px'
                el.style.height = h + 'px'
            })
        })
        observer.observe(el, {
            childList: true,
            subtree: true,
        })
    },
    mounted(el, binding) {
        getElementAutoSize(el, binding.value)
    }
} as ObjectDirective<HTMLElement, AutoSizeType | undefined>

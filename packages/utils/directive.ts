import {DirectiveBinding, ObjectDirective} from 'vue'

const eventNames: (keyof GlobalEventHandlersEventMap)[] = [
    'copy', 'cut', 'paste', 'invalid',
    'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup',
    'wheel', 'click', 'dblclick',
    'keydown', 'keyup', 'keypress',
    'focus', 'focusin', 'focusout', 'blur',
    'input', 'beforeinput',
]

function updateDisabledStatus<T>(el: HTMLElement, binding: DirectiveBinding<T>) {
    if (binding.value !== false) {
        el.setAttribute('data-disabled', '')
        el.setAttribute('disabled', 'true')
        el.blur()
    } else {
        el.removeAttribute('data-disabled')
        el.removeAttribute('disabled')
    }
}

/**
 * 阻止事件冒泡，自动为元素添加 data-disabled 属性
 */
export const vDisabled = {
    created(el, binding, vNode) {

        function stop(e: Event) {
            if (el.hasAttribute('data-disabled')) {
                e.stopImmediatePropagation()
            }
        }

        eventNames.forEach(name => {
            el.addEventListener(name, stop)
        })

    },
    mounted(el, binding) {
        updateDisabledStatus(el, binding)
    },
    updated(el, binding, vNode) {
        updateDisabledStatus(el, binding)
    },
    deep: true
} as ObjectDirective<HTMLElement, boolean | undefined>

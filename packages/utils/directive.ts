import {ObjectDirective} from "vue"

const eventNames: (keyof GlobalEventHandlersEventMap)[] = [
    'copy', 'cut', 'paste', 'invalid',
    'mousedown', "mouseenter", 'mouseleave', "mousemove", "mouseout", "mouseover", 'mouseup',
    'wheel', 'click', 'dblclick',
    'keydown', 'keyup', 'keypress',
    'focus', 'focusin', 'focusout', 'blur',
    'input', 'beforeinput',
]

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
    updated(el, binding, vNode) {
        if (binding.value) {
            el.setAttribute('data-disabled', '')
            el.blur()
        } else {
            el.removeAttribute('data-disabled')
        }
    }
} as ObjectDirective<HTMLElement, boolean | undefined>

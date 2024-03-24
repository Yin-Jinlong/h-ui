import {ObjectDirective} from "vue";

function is(el: any) {
    const prototype = Object.getPrototypeOf(el)
    if (prototype === HTMLElement.prototype)
        return true
    if (prototype === Object.prototype)
        return false
    return is(prototype)
}

function checkType(el: any, name: string) {
    if (is(el))
        return
    throw new Error(`${name} can only be used on HTMLElement`)
}

export const vMouseEvent = {
    beforeMount(el, binding, a, vNode) {
        checkType(el, 'v-mouse-event')
        el.addEventListener('drag', binding.value)
        el.addEventListener('dragend', binding.value)
        el.addEventListener('dragenter', binding.value)
        el.addEventListener('dragleave', binding.value)
        el.addEventListener('dragover', binding.value)
        el.addEventListener('dragstart', binding.value)
        el.addEventListener('drop', binding.value)
        el.addEventListener('mousedown', binding.value)
        el.addEventListener('mouseenter', binding.value)
        el.addEventListener('mouseleave', binding.value)
        el.addEventListener('mousemove', binding.value)
        el.addEventListener('mouseout', binding.value)
        el.addEventListener('mouseover', binding.value)
        el.addEventListener('mouseup', binding.value)
    }
} as ObjectDirective<HTMLElement, (e: MouseEvent) => void>

export const vKeyEvent = {
    beforeMount(el, binding, a, vNode) {
        checkType(el, 'v-key-event')
        el.addEventListener('keyup', binding.value)
        el.addEventListener('keydown', binding.value)
        el.addEventListener('keypress', binding.value)
    }
} as ObjectDirective<HTMLElement, (e: Event) => void>

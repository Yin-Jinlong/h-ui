import {ObjectDirective} from "vue"

function render(el: HTMLElement, str: string) {
    el.innerHTML = window.code(str, 'vue')
}

export const vCode = {
    created(el, binding) {
        el.classList.add('h-code')
        window.addEventListener('theme-change', () => {
            render(el, binding.value)
        })
        render(el, binding.value)
    },
    updated(el, binding) {
        render(el, binding.value)
    }
} as ObjectDirective<HTMLElement, string>

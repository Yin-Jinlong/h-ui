import {ref} from 'vue'
import {isDark} from '@yin-jinlong/h-ui'

const darkTheme = ref(isDark())

class ThemeEvent extends Event {
    readonly theme: 'dark' | 'light'

    constructor(theme: 'dark' | 'light') {
        super('theme-change')
        this.theme = theme
    }
}

let lastDark = isDark()
new MutationObserver(() => {
    let dark = isDark()
    if (lastDark !== dark) {
        lastDark = dark
        let event: ThemeEvent = new ThemeEvent(dark ? 'dark' : 'light')
        darkTheme.value = dark
        window.dispatchEvent(event)
    }
}).observe(document.documentElement, {
    attributes: true
})


export {darkTheme}

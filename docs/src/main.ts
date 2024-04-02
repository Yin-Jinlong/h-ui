import {codeToHtml} from 'shiki'
import {createApp} from 'vue'

import App from './App.vue'
import {vCode} from './utils'

import './style.scss'
import {isDark} from "@yin-jinlong/h-ui"

class ThemeEvent extends Event {
    readonly theme: 'dark' | 'light'

    constructor(theme: 'dark' | 'light') {
        super('theme-change');
        this.theme = theme
    }
}

window.code = (code, lang) => {
    return codeToHtml(code, {
        lang,
        theme: isDark() ? 'dark-plus' : 'light-plus'
    })
}

let lastDark = isDark()
new MutationObserver(() => {
    let dark = isDark()
    if (lastDark !== dark) {
        lastDark = dark
        let event: ThemeEvent = new ThemeEvent(dark ? 'dark' : 'light')
        window.dispatchEvent(event)
    }
}).observe(document.documentElement, {
    attributes: true
})

const app = createApp(App)
app.directive('code', vCode)
app.mount(document.body)

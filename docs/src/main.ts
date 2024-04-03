import {createApp} from 'vue'
import {isDark} from "@yin-jinlong/h-ui"

import App from './App.vue'
import {mountCode} from "./highlight"
import {vCode} from './utils'

import './style.scss'

class ThemeEvent extends Event {
    readonly theme: 'dark' | 'light'

    constructor(theme: 'dark' | 'light') {
        super('theme-change');
        this.theme = theme
    }
}

mountCode().then()

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

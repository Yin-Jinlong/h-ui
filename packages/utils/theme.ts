export function isDark() {
    return document.documentElement.hasAttribute('dark')
}

export function toggleDark() {
    document.documentElement.toggleAttribute('dark')
}

class ThemeEvent extends Event {
    readonly theme: 'dark' | 'light'

    constructor(theme: 'dark' | 'light') {
        super('theme-change')
        this.theme = theme
    }
}

export function installThemeEvent() {
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
}

export function isDark() {
    return document.documentElement.hasAttribute('dark')
}

export function toggleDark() {
    document.documentElement.toggleAttribute('dark')
}

import {expect, test} from 'vitest'
import {isDark, toggleDark} from '../theme'

test('isDark', () => {
    document.documentElement.setAttribute('dark', '')
    expect(isDark()).toBe(true)
    document.documentElement.removeAttribute('dark')
    expect(isDark()).toBe(false)
})

test('toggleDark', () => {
    document.documentElement.setAttribute('dark', '')
    expect(isDark()).toBe(true)
    toggleDark()
    expect(isDark()).toBe(false)
})

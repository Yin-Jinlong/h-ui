import {expect, test} from 'vitest'
import {isDark} from "../theme"

test('isDark', () => {
    document.documentElement.setAttribute('dark', '')
    expect(isDark()).toBe(true)
    document.documentElement.removeAttribute('dark')
    expect(isDark()).toBe(false)
})

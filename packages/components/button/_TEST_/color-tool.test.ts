import {expect, test} from 'vitest'

import {genColor} from '../src/color-tool'

test('genColor named', () => {
    const lc = 1
    const dc = 2

    // 命名颜色
    const namedColor = 'danger'
    let colors = genColor(namedColor, lc, dc)
    expect(colors.length).toBe(lc + dc + 1)
    expect(colors[0]).toBe(`var(--h-color-${namedColor})`)
    for (let i = 1; i <= lc; i++) {
        expect(colors[i]).toBe(`var(--h-color-${namedColor}-${i})`)
    }
    for (let i = 1; i <= dc; i++) {
        expect(colors[i + lc]).toBe(`var(--h-color-${namedColor}--${i})`)
    }
})

test('genColor css', () => {
    const lc = 1
    const dc = 2

    // css颜色
    const cssColor = '#ff0000'
    let colors = genColor(cssColor, lc, dc)
    expect(colors.length).toBe(lc + dc + 1)
    // todo
})

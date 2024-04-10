import {expect, test} from 'vitest'
import {cssVar, cssVarName} from '../css'

test('cssVar', () => {
    let v = cssVar('test')
    expect(v).toBe('var(--h-test)')
})

test('cssVarName', () => {
    let v = cssVarName('test')
    expect(v).toBe('--h-test')
})

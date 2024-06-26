import {render} from '@testing-library/vue'
import {assertAttribute, assertHasClass, element} from '@yin-jinlong/h-ui/_TEST_UTILS_'
import {expect, test} from 'vitest'

import Button from '../src/button.vue'

import '../style'

test('button', () => {
    const btn = render(Button)
    const ele = element(btn)
    assertHasClass(ele, 'h-button')
})

test('button color-css', () => {
    const btn = render(Button, {
        props: {
            color: '#123'
        }
    })
    const ele = element(btn)
    let c = ele.style.getPropertyValue('--h-button-color')
    expect(c).toBe('#112233')
})

test('button color-named', () => {
    const btn = render(Button, {
        props: {
            color: 'success'
        }
    })
    const ele = element(btn)
    let c = ele.style.getPropertyValue('--h-button-color')
    expect(c).toBe('var(--h-color-success)')
})

test('button disabled', () => {
    const btn = render(Button, {
        props: {
            disabled: true
        }
    })
    const ele = element(btn)
    assertAttribute(ele, 'data-disabled')
})

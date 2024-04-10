import {render} from '@testing-library/vue'
import {assertAttribute, assertHasClass, assertNoAttribute, element} from '@yin-jinlong/h-ui/_TEST_UTILS_'
import {test} from 'vitest'

import CheckBox from '../src/check-box.vue'

import '../style'

test('check-box', () => {
    const card = render(CheckBox)
    const ele = element(card)
    assertHasClass(ele, 'h-check-box')
})

test('check-box not-checked', () => {
    const card = render(CheckBox, {
        props: {
            modelValue: false,
        }
    })
    const ele = element(card)
    assertNoAttribute(ele, 'data-checked')
})

test('check-box checked', () => {
    const card = render(CheckBox, {
        props: {
            modelValue: true,
        }
    })
    const ele = element(card)
    assertAttribute(ele, 'data-checked')
})

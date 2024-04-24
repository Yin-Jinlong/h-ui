import {render} from '@testing-library/vue'
import {assertAttribute, assertHasClass, assertNoAttribute, element} from '@yin-jinlong/h-ui/_TEST_UTILS_'
import {test} from 'vitest'

import Switch from '../src/switch.vue'

import '../style'

test('switch', () => {
    const card = render(Switch)
    const ele = element(card)
    assertHasClass(ele, 'h-switch')
})

test('switch off', () => {
    const card = render(Switch, {
        props: {
            modelValue: false,
        }
    })
    const ele = element(card)
    assertNoAttribute(ele, 'data-on')
})

test('switch on', () => {
    const card = render(Switch, {
        props: {
            modelValue: true,
        }
    })
    const ele = element(card)
    assertAttribute(ele, 'data-on')
})

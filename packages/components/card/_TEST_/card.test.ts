import {render} from '@testing-library/vue'
import {assertChildrenLength, assertHasClass, element} from '@yin-jinlong/h-ui/_TEST_UTILS_'
import {test} from 'vitest'

import Card from '../src/card.vue'

import '../style'

const CLASS_NAMES = ['h-card-header', 'h-card-line', 'h-card-content', 'h-card-line', 'h-card-footer']

test('card', () => {
    const card = render(Card, {
        slots: {
            header: () => 'test-header',
            default: () => 'test',
            footer: () => 'test-footer'
        }
    })
    const ele = element(card)
    assertHasClass(ele, 'h-card')
    assertChildrenLength(ele, 5)
    Array.from(ele.children).forEach((c, i) => {
        assertHasClass(c, CLASS_NAMES[i])
    })
})

test('card no-header', () => {
    const card = render(Card, {
        slots: {
            default: () => 'test',
            footer: () => 'test-footer'
        }
    })
    const ele = element(card)
    assertChildrenLength(ele, 3)
    Array.from(ele.children).forEach((c, i) => {
        assertHasClass(c, CLASS_NAMES[i + 2])
    })
})

test('card no-footer', () => {
    const card = render(Card, {
        slots: {
            header: () => 'test-header',
            default: () => 'test'
        }
    })
    const ele = element(card)
    assertChildrenLength(ele, 3)
    Array.from(ele.children).forEach((c, i) => {
        assertHasClass(c, CLASS_NAMES[i])
    })
})

test('card only-content', () => {
    const card = render(Card, {
        slots: {
            default: () => 'test'
        }
    })
    const ele = element(card)
    assertChildrenLength(ele, 1)
    assertHasClass(ele.children[0], CLASS_NAMES[2])
})

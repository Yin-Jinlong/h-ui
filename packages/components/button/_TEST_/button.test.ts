import {expect, test} from 'vitest'
import {render, RenderResult} from '@testing-library/vue'
import Button from '../src/button.vue'
import '../style'

function buttonElement(rr: RenderResult) {
    let ele = rr.container.firstElementChild
    expect(ele).not.toBeNull()
    return ele as HTMLElement
}

test('button', () => {
    const btn = render(Button)
    const ele = buttonElement(btn)
    expect(ele.classList.contains('h-button')).toBe(true)
})

test('button color-css', () => {
    const btn = render(Button, {
        props: {
            color: '#123'
        }
    })
    const ele = buttonElement(btn)
    let c = ele.style.getPropertyValue('--h-button-color')
    expect(c).toBe('#112233')
})

test('button color-named', () => {
    const btn = render(Button, {
        props: {
            color: 'success'
        }
    })
    const ele = buttonElement(btn)
    let c = ele.style.getPropertyValue('--h-button-color')
    expect(c).toBe('var(--h-color-success)')
})

test('button disabled', () => {
    const btn = render(Button, {
        props: {
            disabled: true
        }
    })
    const ele = btn.container
    expect(ele.hasAttribute('data-disabled'))
})

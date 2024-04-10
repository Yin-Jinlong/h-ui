import {RenderResult} from '@testing-library/vue'
import {expect} from 'vitest'

export function element(rr: RenderResult) {
    let ele = rr.container.firstElementChild
    expect(ele).not.toBeNull()
    return ele as HTMLElement
}

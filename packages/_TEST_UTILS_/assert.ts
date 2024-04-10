import {expect} from 'vitest'

export function assertChildrenLength(ele: Element, length: number) {
    expect(ele.children.length).toBe(length)
}

export function assertHasClass(ele: Element, c: string) {
    expect(Array.from(ele.classList)).contains(c)
}

import {expect, assert} from 'vitest'

export function assertChildrenLength(ele: Element, length: number) {
    expect(ele.children.length).toBe(length)
}

export function assertHasClass(ele: Element, c: string) {
    expect(Array.from(ele.classList)).contains(c)
}

export function assertAttribute(ele: Element, a: string) {
    assert(ele.hasAttribute(a), `${a} is not exist`)
}

export function assertNoAttribute(ele: Element, a: string) {
    assert(!ele.hasAttribute(a), `${a} is exist`)
}

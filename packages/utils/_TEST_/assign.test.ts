import {expect, test} from 'vitest'
import {deepAssign} from "../assign"

test('deepAssign', () => {
    let a = {
        a1: 1,
        a2: {
            a21: true
        }
    }
    let r = deepAssign({
        b: 'b'
    }, a)
    let er= {
        b: 'b',
        a1: 1,
        a2: {
            a21: true
        }
    }
    expect(r).toEqual(er)
    a.a2.a21=false
    expect(r).toEqual(er)
})

/**
 *
 * 深度合并对象
 *
 * @description 合并sources到target，会忽略undefined的属性
 *
 * @param target 目标对象
 * @param sources 源对象
 *
 * @author yjl
 */
export function deepAssign<S = object, T = object>(target: T, ...sources: S[]): S & T {

    function assign(target: any, source: any): any {
        for (const key in source) {
            let value = source[key]
            if (typeof value === 'object') {
                if (!target[key])
                    target[key] = {}
                assign(target[key], value)
            } else if (value) {
                target[key] = value
            }
        }
        return target
    }

    for (const s of sources)
        assign(target, s)

    return target as S & T
}

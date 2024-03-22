export function deepAssign<S = object, T = object>(target: T, source: S): S & T {

    function assign(target: any, source: any): any {
        for (const key in source) {
            let value = source[key]
            if (typeof value === 'object') {
                if (!target[key])
                    target[key] = {}
                assign(target[key], value)
            } else {
                target[key] = value
            }
        }
        return target
    }

    return assign(target, source) as S & T
}

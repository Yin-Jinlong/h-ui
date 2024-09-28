export function isCompatibility() {
    let uas = navigator.userAgent.toLowerCase().split(' ')
    let ua = uas[uas.length - 1]
    let [name, version] = ua.split('/')
    let [v1, v2] = version.split('.')
    switch (name) {
        case 'firefox':
            return +v1 > 113
        case 'chrome':
        case 'edg':
            return +v1 > 111
        case 'opera':
            return +v1 > 97
        case 'safari':
            let v = +v1
            return v > 16 || (v == 16 && +v2 > 2)
        default:
            return false
    }
}

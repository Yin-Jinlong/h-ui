import {resolve} from 'path'

import {Plugin} from 'vite'

import {colorCode} from './md-code'
import {readText} from './utils'

function resolveName(id: string, sp: string = '?code'): string {
    let parts = id.split(sp)
    return parts[0]
}

export function pressCodePlugin(): Plugin {
    return {
        enforce: 'pre',
        name: 'press-code',
        resolveId(source, importer, options) {
            if (!source.includes('.vue?code'))
                return
            let name = resolveName(source)
            return resolve(importer ?? '.', '..', `${name}.code`)
        },
        async load(id, options) {
            if (!id.includes('.code'))
                return
            let file = resolveName(id, '.code')
            let fileText = readText(file)
            if (!fileText)
                throw new Error(`File not found or could not be read: ${file}`)

            let dark = colorCode(fileText, 'vue', true)
            let light = colorCode(fileText, 'vue', false)

            return `export const dark = \`${dark}\`;export const light = \`${light}\``
        },
        transform(code, id, options) {
            if (!id.match(/.*\.vue\.code(\?(\w|&)*)?/))
                return
            return code
        },
    }
}

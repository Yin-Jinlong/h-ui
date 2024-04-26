import {encode} from 'js-base64'
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

            return `export default \`${(encode(colorCode(fileText, 'vue')))}\``
        },
        transform(code, id, options) {
            if (!id.match(/.*\.vue\.code(\?(\w|&)*)?/))
                return
            return code
        },
    }
}

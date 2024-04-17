import {resolve} from 'path'

import {Plugin} from 'vite'
import {codeToHtml} from 'shiki'

import {readText} from './utils'

function resolveName(id: string, sp: string = '?code', argPrefix: string = '&'): string[] {
    let parts = id.split(sp)
    if (parts[1] && parts[1].startsWith(argPrefix))
        parts[1] = parts[1].substring(1)
    return [parts[0], parts[1] ?? '']
}

export function pressCodePlugin(): Plugin {
    return {
        enforce: 'pre',
        name: 'press-code',
        resolveId(source, importer, options) {
            if (!source.includes('?code'))
                return
            let [name, arg] = resolveName(source)
            return resolve(importer ?? '.', '..', `${name}.code${arg ? '?' : ''}${arg}`)
        },
        load(id, options) {
            if (!id.includes('.code'))
                return
            let [file, theme] = resolveName(id, '.code', '?')
            let themeDark = false
            switch (theme) {
                case 'dark':
                    themeDark = true
                    break
                case 'light':
                    themeDark = false
                    break
                default:
                    throw new Error(`Unknown code theme: ${theme}`)
            }

            let fileText = readText(file)
            if (!fileText)
                throw new Error(`File not found or could not be read: ${file}`)

            return codeToHtml(fileText, {
                theme: themeDark ? 'dark-plus' : 'light-plus',
                lang: 'vue',
            })
        },
        transform(code, id, options) {
            if (!id.match(/.*\.vue\.code(\?(\w|&)*)?/))
                return
            return `export default \`${code}\``
        },
    }
}

import fs from 'fs'

import {Plugin} from 'vite'

export declare interface IndexesOptions {
    dir?: string
}

function genIndexes(dir: string): string {
    let pages = ''
    fs.readdirSync(dir, {
        withFileTypes: true
    }).forEach((dir) => {
        if (dir.isDirectory()) {
            let name = dir.name
            pages += `{
   name: '${name}',
   path: '${name}',
   component: () => import('components/${name}/index.vue?md')
},`
        }
    })
    return pages
}

export function indexesPlugin(options?: IndexesOptions): Plugin {
    return {
        enforce: 'pre',
        name: 'gen-indexes',
        resolveId(source) {
            if (source.endsWith('~')) {
                return source
            }
        },
        load(id) {
            if (id !== 'indexes~')
                return
            return `export default [${genIndexes(options?.dir ?? 'components')}]`
        }
    }
}

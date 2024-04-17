import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token.mjs'

import {convertToBigCamel, convertToSmallCamel, filter} from './utils'

const CASE_REG = /\[\.(?<name>\w+)]/

export function mdCaseCardPlugin(md: MarkdownIt): void {
    md.core.ruler.push('case-card', (state) => {
        let {imports, components} = state.env
        filter(state.tokens, 'text').forEach((t) => {
            if (t.content.includes('[.')) {
                let parts = t.content.split(CASE_REG)
                if (parts.length > 1) {
                    t.type = 'case-card'
                    t.block = true
                    t.children = []
                    t.content = ''
                    for (let i = 0; i < parts.length; i++) {
                        let name = parts[i]
                        let token = new Token('text', '', 0)
                        if (i % 2 == 0) {
                            token.content = name
                            t.children.push(token)
                        } else {
                            token.content = `<case-card :code="${name}Code" :component="${convertToBigCamel(name)}"/>`
                            components.add('case-card')
                            imports.push(`import ${convertToBigCamel(name)} from './${name}.vue'`)
                            imports.push(`import ${convertToSmallCamel(name)}Code from './${name}.vue?raw'`)
                        }
                        t.children.push(token)
                        t.content += token.content
                    }
                }
            }
        })
    })

    md.renderer.rules['case-card'] = (tokens, idx, options, env, self) => {
        return tokens[idx].content
    }

}

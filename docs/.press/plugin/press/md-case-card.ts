import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token.mjs'

import {convertToBigCamel, convertToSmallCamel, filter} from './utils'
import {VueMdEnv} from './vue-tool'

const CASE_REG = /\[\.(?<name>\w+|\w+-\w+)]/

export function mdCaseCardPlugin(md: MarkdownIt): void {
    md.core.ruler.push('case-card', (state) => {
        let {imports, components, codes} = state.env as VueMdEnv
        filter(state.tokens, 'text').forEach((t) => {
            if (t.content.includes('[.')) {
                let parts = t.content.split(CASE_REG)
                if (parts.length > 1) {
                    t.type = 'case-card'
                    t.block = true
                    t.children = []
                    t.content = ''
                    imports.add(`import {darkTheme} from '@/theme'`)
                    for (let i = 0; i < parts.length; i++) {
                        let name = parts[i]
                        let token = new Token('text', '', 0)
                        if (i % 2 == 0) {
                            token.content = name
                            t.children.push(token)
                        } else {
                            let big = convertToBigCamel(name)
                            let small = convertToSmallCamel(name)
                            let code = `${small}Code`
                            token.content = `<case-card :code="${code}":component="${big}"/>`
                            components.add('case-card')
                            imports.add(`import ${big} from './${name}.vue'`)
                            imports.add(`import ${code}Base64 from './${name}.vue?code'`)
                            imports.add(`const ${code} = Base64.decode(${code}Base64)`)
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

import MarkdownIt from 'markdown-it'

import {getVueComponent, setPathRoot} from '../../../../packages/build-utils/webtypes'

import {filter} from './utils'
import {VueMdEnv} from './vue-tool'

const CASE_REG = /\[:api=(?<name>.+?)]/

setPathRoot('../packages')

export function mdDocCardPlugin(md: MarkdownIt): void {
    md.core.ruler.push('doc-card', (state) => {
        let {imports, components, codes} = state.env as VueMdEnv
        filter(state.tokens, 'text').forEach((t) => {
            if (t.content.includes('[:api=')) {
                let parts = t.content.split(CASE_REG)
                if (parts.length > 1) {
                    t.type = 'doc-card'
                    t.block = true
                    t.children = []
                    components.add('DocCard')
                    let c = getVueComponent(parts[1])
                    imports.add('const api=' + JSON.stringify(c))
                }
            }
        })
    })

    md.renderer.rules['doc-card'] = (tokens, idx, options, env, self) => {
        return `<doc-card :api="api"/>`
    }

}

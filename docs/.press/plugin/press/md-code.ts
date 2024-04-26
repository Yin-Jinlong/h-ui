import MarkdownIt from 'markdown-it'
import Prismjs from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import {encode} from 'js-base64'

import {filter} from './utils'
import {VueMdEnv} from './vue-tool'

export function mdCodePlugin(md: MarkdownIt) {

    function genName(prefix: string): string {
        return `${prefix}_${Math.random().toString(36).substring(2)}`
    }

    md.core.ruler.push('code', (state) => {
        let {codes, components} = state.env as VueMdEnv
        filter(state.tokens, 'fence').filter((token) => token.tag === 'code').forEach((token) => {
            if (token.markup === '```') {
                token.type = 'code'
                let code = token.content
                let lang = token.info
                let colored = colorCode(code, lang)
                components.add('code-box')
                token.meta = genName('code')
                codes.push(`const ${token.meta}=Base64.decode('${encode(colored)}')`)
            }
        })
        filter(state.tokens, 'code_inline').filter((token) => token.tag === 'code').forEach((token) => {
            token.attrSet('inline', '')
        })
    })
    md.renderer.rules.code = (tokens, idx) => {
        let meta = tokens[idx].meta
        return `<code-box :code="${meta}"/>`
    }
}

loadLanguages(['shell','ts','scss'])
Prismjs.languages.vue = Prismjs.languages.html

export function colorCode(code: string, lang: string) {
    return `<pre><code class="language-${lang}">${Prismjs.highlight(code,Prismjs.languages[lang],lang)}</code></pre>`
}

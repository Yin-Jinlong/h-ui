import MarkdownIt from 'markdown-it'
import {getHighlighter} from 'shiki'
import {filter} from '.press/plugin/press/utils'
import {VueMdEnv} from '.press/plugin/press/vue-tool'

const highlighter = await getHighlighter({
    langs: [
        'html',
        'javascript',
        'js',
        'markdown',
        'md',
        'plaintext',
        'sql',
        'text',
        'ts',
        'typescript',
        'vue',
        'xml',
        'yaml',
    ],
    langAlias: {},
    themes: ['dark-plus', 'light-plus']
})

export function mdCodePlugin(md: MarkdownIt) {

    function genName(prefix: string): string {
        return `${prefix}_${Math.random().toString(36).substring(2)}`
    }

    md.core.ruler.push('code', (state) => {
        let {codes, components} = state.env as VueMdEnv
        filter(state.tokens, 'fence').filter((token) => token.tag === 'code').forEach((token) => {
            if (token.markup === '```') {
                token.type = 'code'
                let meta: Record<string, string> = {}
                let code = token.content
                let lang = token.info
                let dark = colorCode(code, lang, true)
                let light = colorCode(code, lang, false)
                components.add('code-box')
                meta.light = genName('lightCode')
                meta.dark = genName('darkCode')
                codes.push(`const ${meta.light}=\`${light}\``)
                codes.push(`const ${meta.dark}=\`${dark}\``)
                token.meta = meta
            }
        })
    })
    md.renderer.rules.code = (tokens, idx) => {
        let meta = tokens[idx].meta
        return `<code-box :light="${meta.light}" :dark="${meta.dark}"/>`
    }
}

export function colorCode(code: string, lang: string, dark: boolean) {
    return highlighter.codeToHtml(code, {
        lang,
        theme: dark ? 'dark-plus' : 'light-plus'
    })
}

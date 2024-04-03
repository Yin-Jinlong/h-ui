import {getHighlighterCore} from 'shiki/core'
import loadWasm from 'shiki/wasm'
import {isDark} from "@yin-jinlong/h-ui"

import light from 'shiki/themes/light-plus.mjs'
import dark from 'shiki/themes/dark-plus.mjs'

export async function mountCode() {

    const highlighter = await getHighlighterCore({
        themes: [
            light,
            dark,
        ],
        langs: [
            import('shiki/langs/typescript.mjs'),
            import('shiki/langs/vue-html.mjs'),
        ],
        loadWasm
    })

    window.code = (code, lang) => {
        return highlighter.codeToHtml(code, {
            lang,
            theme: isDark() ? 'dark-plus' : 'light-plus'
        })
    }
}

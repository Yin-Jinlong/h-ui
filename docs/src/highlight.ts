import {isDark} from "@yin-jinlong/h-ui"

export async function mountCode() {
    const shiki = await import('shiki/core')
    const highlighter = await shiki.getHighlighterCore({
        themes: [
            import('shiki/themes/light-plus.mjs'),
            import('shiki/themes/dark-plus.mjs'),
        ],
        langs: [
            import('shiki/langs/typescript.mjs'),
            import('shiki/langs/vue-html.mjs'),
        ],
        loadWasm: import('shiki/wasm')
    })

    window.code = (code, lang) => {
        return highlighter.codeToHtml(code, {
            lang,
            theme: isDark() ? 'dark-plus' : 'light-plus'
        })
    }
}

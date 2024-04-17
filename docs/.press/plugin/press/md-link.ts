import MarkdownIt from 'markdown-it'

import {filter} from './utils'

export function mdLinkPlugin(md: MarkdownIt): void {
    md.core.ruler.push('link-md', (state) => {
        filter(state.tokens, 'link_open').forEach((t) => {
            if (t.attrs) {
                let href = t.attrGet('href')
                if (href) {
                    href = href.slice(0, -3)
                    if (href.endsWith('/index'))
                        href = href.slice(0, -6)
                    t.attrSet('href', '#' + href)
                }
            }
        })
    })
}

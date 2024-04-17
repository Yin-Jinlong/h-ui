import MarkdownIt from 'markdown-it'

import {filter} from './utils'

const COMPONENT_REG = /^<\/?(?<name>(\w+-)*\w+).*-?>\s*\r?\n?$/

function maybeComponent(name: string): boolean {
    // 如果是-命名或者大驼峰命名
    return /[A-Z]/.test(name)
}

/**
 * 转换成-命名
 * @param name
 */
function convertName(name: string) {
    let r = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    if (r.startsWith('-'))
        r = r.slice(1)
    return r
}

export function mdVueComponentPlugin(md: MarkdownIt): void {
    md.core.ruler.push('vue-component', (state) => {
        filter(state.tokens, 'html_block').forEach((t) => {
            if (t.content.match(COMPONENT_REG)) {
                let r = COMPONENT_REG.exec(t.content)!
                let name = r.groups!['name']
                if (maybeComponent(name))
                    state.env.components.add(convertName(name))
            }
        })
    })
}

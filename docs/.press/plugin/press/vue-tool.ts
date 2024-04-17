import MarkdownIt from 'markdown-it'
import markdownItFrontMatter from 'markdown-it-front-matter'
import {load} from 'js-yaml'

import {mdCaseCardPlugin} from './md-case-card'
import {mdLinkPlugin} from './md-link'
import {mdVueComponentPlugin} from './md-vue-component'
import {convertToBigCamel, exists, readText} from './utils'


interface VueMdEnv {
    id: string
    components: Set<string>
    imports: string[]
    attrs: Record<string, any>
}

const md = new MarkdownIt({
    html: true,
})

const map = new Map<string, string>()

const importsMap: Record<string, string[]> = {}

function getComponentPkg(component: string): string {
    for (const k in importsMap) {
        if (importsMap[k].includes(component))
            return k
    }
    return ''
}

export function setImportsMap(imports: Record<string, string[]>) {
    Object.assign(importsMap, imports)
}

export function convertToVue(id: string): string | undefined {
    let oid = id
    id = id.replace('.vue?md', '.md')
    if (!exists(id))
        return
    map.set(id, oid)
    let env: VueMdEnv = {
        id,
        components: new Set(),
        imports: [],
        attrs: {},
    }
    let code = md.render(readText(id) ?? '', env)

    function genImport(): string {
        let cs: Record<string, Set<string>> = {}
        for (const component of env.components) {
            let pkg = getComponentPkg(convertToBigCamel(component))
            if (!pkg)
                throw new Error(`${component} not found in importsMap`)
            if (!cs[pkg])
                cs[pkg] = new Set()
            cs[pkg].add(component)
        }
        let s = ''
        Object.entries(cs).forEach(([pkg, components]) => {
            s += `import { ${Array.from(components).map(c => convertToBigCamel(c)).join(', ')} } from '${pkg}'`
        })
        return s
    }

    return `<template>${code}</template>
<script lang="ts" setup>
    import {onMounted} from 'vue' 
    ${genImport()}
    ${env.imports.join('\n')}
    
    onMounted(()=>{
        document.title='${env.attrs?.title ?? ''}'
    })
</script>`
}

export function getVueMdId(id: string): string | undefined {
    return map.get(id)
}

md.use(markdownItFrontMatter, (fm: string[]) => {

})
md.use(md => {
    md.core.ruler.push('front-matter-reader', ({tokens, env}) => {
        if (!tokens || tokens[0].type !== 'front_matter')
            return
        let token = tokens[0]
        let attr = load(token.meta)
        Object.assign(env.attrs, attr)
    })
})

md.use(mdLinkPlugin)
md.use(mdVueComponentPlugin)
md.use(mdCaseCardPlugin)
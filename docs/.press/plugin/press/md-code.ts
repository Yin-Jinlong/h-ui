import MarkdownIt from 'markdown-it'
import {BundledLanguage, getHighlighter} from 'shiki'
import {encode} from 'js-base64'

import {filter} from './utils'
import {VueMdEnv} from './vue-tool'

const highlighter = await getHighlighter({
    langs: [
        'abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara',
        'asm', 'astro', 'awk', 'ballerina', 'bash', 'bat', 'batch', 'be', 'beancount', 'berry', 'bibtex', 'bicep',
        'blade', 'c', 'c#', 'c++', 'cadence', 'cdc', 'clarity', 'clj', 'clojure', 'cmake', 'cmd', 'cobol', 'codeql',
        'coffee', 'coffeescript', 'console', 'cpp', 'cql', 'crystal', 'cs', 'csharp', 'css', 'csv', 'cue', 'cypher',
        'd', 'dart', 'dax', 'diff', 'docker', 'dockerfile', 'dream-maker', 'elixir', 'elm', 'erb', 'erl', 'erlang',
        'f', 'f#', 'f03', 'f08', 'f18', 'f77', 'f90', 'f95', 'fish', 'for', 'fortran-fixed-form', 'fortran-free-form',
        'fs', 'fsharp', 'fsl', 'gdresource', 'gdscript', 'gdshader', 'gherkin', 'git-commit', 'git-rebase', 'gjs',
        'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'gql', 'graphql', 'groovy', 'gts', 'hack',
        'haml', 'handlebars', 'haskell', 'hbs', 'hcl', 'hjson', 'hlsl', 'hs', 'html', 'html-derivative', 'http',
        'imba', 'ini', 'jade', 'java', 'javascript', 'jinja', 'jison', 'jl', 'js', 'json', 'json5', 'jsonc', 'jsonl',
        'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kql', 'kt', 'kts', 'kusto', 'latex', 'less', 'liquid', 'lisp',
        'logo', 'lua', 'make', 'makefile', 'markdown', 'marko', 'matlab', 'md', 'mdc', 'mdx', 'mermaid', 'mojo',
        'move', 'nar', 'narrat', 'nextflow', 'nf', 'nginx', 'nim', 'nix', 'nu', 'nushell', 'objc', 'objective-c',
        'objective-cpp', 'ocaml', 'pascal', 'perl', 'perl6', 'php', 'plsql', 'postcss', 'powerquery', 'powershell',
        'prisma', 'prolog', 'properties', 'proto', 'ps', 'ps1', 'pug', 'puppet', 'purescript', 'py', 'python', 'ql',
        'r', 'raku', 'razor', 'rb', 'reg', 'rel', 'riscv', 'rs', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala',
        'scheme', 'scss', 'sh', 'shader', 'shaderlab', 'shell', 'shellscript', 'shellsession', 'smalltalk',
        'solidity', 'sparql', 'spl', 'splunk', 'sql', 'ssh-config', 'stata', 'styl', 'stylus', 'svelte', 'swift',
        'system-verilog', 'tasl', 'tcl', 'terraform', 'tex', 'tf', 'tfvars', 'toml', 'ts', 'tsv', 'tsx', 'turtle',
        'twig', 'typ', 'typescript', 'typst', 'v', 'vb', 'verilog', 'vhdl', 'vim', 'viml', 'vimscript', 'vue',
        'vue-html', 'vy', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wl', 'wolfram', 'xml', 'xsl', 'yaml', 'yml',
        'zenscript', 'zig', 'zsh', '文言'
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
                codes.push(`const ${meta.light}=Base64.decode('${encode(light)}')`)
                codes.push(`const ${meta.dark}=Base64.decode('${encode(dark)}')`)
                token.meta = meta
            }
        })
        filter(state.tokens, 'code_inline').filter((token) => token.tag === 'code').forEach((token) => {
            token.attrSet('inline', '')
        })
    })
    md.renderer.rules.code = (tokens, idx) => {
        let meta = tokens[idx].meta
        return `<code-box :light="${meta.light}" :dark="${meta.dark}"/>`
    }
}

export function colorCode(code: string, lang: BundledLanguage | string, dark: boolean) {
    return highlighter.codeToHtml(code, {
        lang,
        theme: dark ? 'dark-plus' : 'light-plus'
    })
}

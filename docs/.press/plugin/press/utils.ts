import {existsSync, statSync, readFileSync, readdirSync} from 'fs'
import MarkdownIt from 'markdown-it'

export function exists(path: string): boolean {
    return existsSync(path)
}

export function isDir(path: string): boolean {
    return exists(path) && statSync(path).isDirectory()
}

export function readText(path: string): string | undefined {
    return exists(path) ? readFileSync(path).toString() : undefined
}

export function listFiles(path: string, filter: (f: string) => boolean = () => true, deep: boolean = true): string[] {
    let r: string[] = []
    readdirSync(path, {
        withFileTypes: true
    }).forEach(f => {
        let file = path + '/' + f.name
        if (f.isDirectory() && deep) {
            r = r.concat(listFiles(file, filter, deep))
        }
        if (filter(file)) {
            r.push(file)
        }
    })
    return r
}


export function filter(tokens: MarkdownIt.Token[], name: string) {
    let r: MarkdownIt.Token[] = []
    for (let token of tokens) {
        if (token.children && token.children.length)
            r.push(...filter(token.children, name))
        else if (token.type === name)
            r.push(token)
    }
    return r
}


export function convertToBigCamel(name: string) {
    let parts = name.split('-')
    let r = ''
    for (let part of parts) {
        r += part.charAt(0).toUpperCase() + part.slice(1)
    }
    return r
}

export function convertToSmallCamel(name: string) {
    let r = convertToBigCamel(name)
    return r.charAt(0).toLowerCase() + r.slice(1)
}


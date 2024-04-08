export function cssVar(name: string, def: string = '') {
    return `var(--h-${name}${def ? `,${def}` : ''})`
}

export function cssVarName(name: string) {
    return `--h-${name}`
}

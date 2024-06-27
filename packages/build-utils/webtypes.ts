import tsm, {JSDocableNodeStructure, JSDocStructure, OptionalKind} from 'ts-morph'

declare type WithDesc = {
    description?: string
}

declare type WithDocURl = {
    'doc-url'?: string
}

declare type MaybeArray<T> = T | T[]

declare interface TypeReference {
    module?: string
    name: string
}

declare interface VueComponentProps extends WithDesc, WithDocURl {
    name: string
    type: MaybeArray<string | TypeReference>
}

export declare interface VueComponent extends WithDesc, WithDocURl {
    name: string
    source: {
        symbol: string
    }
    props?: VueComponentProps[]
    propsExtends?: string[]
}

let pathRoot = '.'

export function setPathRoot(root: string) {
    pathRoot = root
}

let p = new tsm.Project()

let urlPrefix = 'https://yin-jinlong.github.io/h-ui/#'

export function setUrlPrefix(prefix: string) {
    urlPrefix = prefix
}

function toDocStr(docs: OptionalKind<JSDocStructure> | string): string {
    if (typeof docs === 'string')
        return docs
    return docs.description?.toString()?.trim().replaceAll('\r\n', '\n') ?? ''
}

function getDocStr(structure: JSDocableNodeStructure) {
    if (!structure.docs || structure.docs.length == 0)
        return ''
    return toDocStr(structure.docs[0])
}

function firstUpper(...ss: string[]) {
    return ss.map(s => s[0].toUpperCase() + s.substring(1)).join('')
}

export function getVueComponent(name: string, prefix: string = 'h'): VueComponent {
    function sourceFile(tn: string) {
        return p.addSourceFileAtPath(`${pathRoot}/components/${name}/src/${tn}.ts`)
    }

    function getComponentDesc() {
        let sf = p.addSourceFileAtPath(`${pathRoot}/components/${name}/index.ts`)
        let defExportName = sf.getDefaultExportSymbol()?.getAliasedSymbol()?.getName()
        if (!defExportName)
            throw new Error(`${name}'s default export should be a variable`)
        let v = sf.getVariableStatement(defExportName)
        if (!v)
            return ''
        let s = v.getStructure()
        return getDocStr(s)
    }

    function getProps(): [string[], VueComponentProps[]] {
        let propSF
        try {
            propSF = sourceFile('props')
        } catch (e) {
            return [[], []]
        }
        let interfaces = propSF.getInterfaces().filter(i => i.isExported())
        if (interfaces.length !== 1)
            throw new Error(`${name}'s props should have one and only one exported interface`)

        let props: VueComponentProps[] = []

        let ei = interfaces[0]
        let structure = ei.getStructure()

        structure.properties?.forEach(p => {
            let docs = getDocStr(p)
            props.push({
                name: p.name,
                type: p.type as string,
                description: docs,
                'doc-url': urlPrefix + name + '?loc=' + p.name
            })
        })
        return [structure.extends as string[], props]
    }

    let [extendsNames, props] = getProps()

    return {
        name: `${prefix}-${name}`,
        source: {
            symbol: firstUpper(prefix, name)
        },
        description: getComponentDesc(),
        'doc-url': urlPrefix + name,
        props: props,
        propsExtends: extendsNames
    }
}

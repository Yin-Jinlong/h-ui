import {readdirSync} from 'fs'
import {relative, resolve} from 'path'

import {Plugin} from 'vite'

import {convertToBigCamel, listFiles} from './utils'
import {addImportsMap, convertToVue, getVueMdId} from './vue-tool'

export declare interface PressOptions {
    setupFile?: string
    importsMap?: Record<string, string[]>
}

function isVueMd(id: string) {
    return id.endsWith('?md')
}

const INDEX_HTML = `<!doctype html>
<html lang="zh-cn">
<meta charset="UTF-8"/>
<link href="/vite.svg" rel="icon" type="image/svg+xml"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>H-UI Docs</title>
<script src="main.ts?press" type="module"></script>`

function addComponentsMap(path: string) {
    let cs: string[] = []
    readdirSync(path, {
        withFileTypes: true
    }).forEach((f) => {
        if (f.isDirectory()) {
            cs.push(convertToBigCamel(f.name))
        }
    })
    addImportsMap({
        '@components': cs
    })
}

export function pressPlugin(options?: PressOptions): Plugin {
    addImportsMap(options?.importsMap ?? {})
    const setupFile = options?.setupFile

    const MAIN_TS = `import {createApp} from 'vue'
${setupFile ? `import setup from '${setupFile}'` : ''}

import App from './index.vue?md'

const app = createApp(App)
${setupFile ? `setup(app).then(()=>{
    app.mount(document.body)
})` : ''}
`

    return {
        enforce: 'pre',
        name: 'press-md',
        configResolved(config) {
            if (!config.resolve.alias)
                return
            let cr = config.resolve.alias.find((a) => a.find === '@components')?.replacement
            if (cr)
                addComponentsMap(cr)
        },
        configureServer(server) {

            let {watcher} = server

            listFiles('.', (f) => f.endsWith('.md')).forEach((f) => {
                watcher.add(f)
            })

            server.middlewares.use(async (req, res, next) => {
                let url = req.url ?? '/'
                if (url === '/') {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(INDEX_HTML)
                    return
                }
                next()
            })
        },
        handleHotUpdate(ctx) {
            let {file, server, modules, timestamp} = ctx
            if (!file.endsWith('.md'))
                return
            let id = getVueMdId(file)
            if (!id)
                return
            let module = server.moduleGraph.getModuleById(id)
            if (module)
                return [module]
        },
        resolveId(source, importer, options) {
            if (source.endsWith('index.html')) {
                return source.replace(/\\/g, '/')
            } else if (source.endsWith('main.ts?press'))
                return resolve('.', './main.ts?press').replace(/\\/g, '/')
            if (!isVueMd(source))
                return
            return source
        },
        load(id, options) {
            if (relative('.', id) === 'index.html')
                return INDEX_HTML
            if (id.endsWith('main.ts?press')) {
                return MAIN_TS
            }
            if (!isVueMd(id))
                return
            return convertToVue(id)
        },
    }
}


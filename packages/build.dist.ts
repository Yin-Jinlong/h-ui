import fs from 'fs'
import node_path from 'path'
import {performance} from 'perf_hooks'

import {codecovRollupPlugin} from '@codecov/rollup-plugin'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import vuePlugin from '@vitejs/plugin-vue'
import {clean} from 'build-tool'
import process from 'process'
import {Plugin, rollup} from 'rollup'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'

import {getVueComponent} from './build-utils/webtypes'

import {
    OutputOption,
    color,
    convertSize,
    convertTime,
    oraStart,
    oraText,
    oraSucceed,
    outln,
    rollupProcessPlugin
} from '@yin-jinlong/h-ui-build-tool'

import config from './build.config'

const startTime = performance.now()
const {stdout} = process

const {action, cmd, danger, emphasize, gray, num, path} = color

const version = (() => {
    let v = (process.env.VERSION_REF ?? '').trim()
    if (!v)
        return '0.0.0-dev'
    if (!v.startsWith('refs/tags/v'))
        throw new Error('no version ref')
    return v.substring(11)
})()

/**
 * 进度插件
 *
 * @return Rollup插件
 */
function processPlugin(): Plugin {
    let count = 0
    let renderCount = 0
    return rollupProcessPlugin({
        transform(id: string) {
            let w = stdout.columns
            let head = `transform(${++count}) `
            let content = id
            let rw = w - head.length
            if (content.length > rw) // 超出宽度
                content = '...' + content.substring(content.length - rw + 3, content.length)
            oraText(cmd('transforming'), `(${count}) ${gray(content)}`)
        },
        buildEnd() {
            oraSucceed(action('transformed '), num(count), ' modules')
        },
        renderStart() {
            renderCount = 0
            oraStart(action('rendering'))
        },
        render(file) {
            oraText(action('rendering '), file)
            renderCount++
        },
        generateBundle() {
            oraSucceed(action('rendered '), num(renderCount), 'files')
        },
        writeBundle(files: string[]) {
            let sizeAll = 0
            files.forEach(f => {
                let {size} = fs.statSync(f)
                sizeAll += size
                if (config.reportOutFileInfo) {
                    let ss = convertSize(size)
                    oraSucceed(path(f), ` ${emphasize(ss.size)}${ss.unit}`)
                }
            })
            let sizeStr = convertSize(sizeAll)
            oraSucceed(action('written '), num(files.length), 'files, ', `${emphasize(sizeStr.size)} ${sizeStr.unit}`)
        }
    })
}


/**
 * 获取输出路径
 *
 * @return 输出路径
 */
function getOutPaths(): string[] {
    if (Array.isArray(config.output))
        return config.output.map((o: OutputOption) => o.dir)
    return [config.output.dir]
}

async function build() {
    if (config.deleteBeforeBuild)
        getOutPaths().forEach(o => {
            if (clean(node_path.resolve(config.dist, o)))
                outln(danger('deleted '), path(o))
        })
    oraStart(`${cmd('build')} start...`)
    let outs = Array.isArray(config.output) ? config.output : [config.output]
    const build = await rollup({
        input: 'index.ts',
        external: id => /node_modules/.test(id),
        plugins: [
            vuePlugin({
                isProduction: true
            }),
            postcss({
                extract: 'index.css',
                extensions: ['.scss', '.sass', '.css'],
            }),
            typescript({
                check: false,
                tsconfigOverride: {}
            }),
            resolve(),
            commonjs(),
            processPlugin(),
            config.minify ? terser() : undefined,
            codecovRollupPlugin({
                enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
                bundleName: 'h-ui-packages',
                uploadToken: process.env.CODECOV_TOKEN,
            }),
            dts({
                tsconfigPath: 'tsconfig.types.json',
            })
        ]
    })

    for (const o of outs) {
        outln(cmd('write '), emphasize(o.format!), '...')
        let jsName = `[name].${o.ext ?? 'js'}`
        await build.write({
            dir: node_path.resolve(config.dist, o.dir),
            entryFileNames: jsName,
            chunkFileNames: jsName,
            format: o.format,
            exports: o.module ? 'named' : 'auto',
            preserveModules: o.module
        })
    }

    await build.close()
    await genPackageJson()
    fs.cpSync('global.d.ts', node_path.resolve(config.dist, 'dist/@types/global.d.ts'))
    outln(action('took '), convertTime(performance.now() - startTime))

}

function getJson(path: string) {
    return JSON.parse(fs.readFileSync(path).toString())
}

function convertWebTypesJson(webTypesJson: Record<string, any>) {
    webTypesJson.version = version
    let components: any[] = []

    fs.readdirSync('components', {
        withFileTypes: true
    }).forEach(dir => {
        if (dir.isDirectory()) {
            components.push(getVueComponent(dir.name))
        }
    })

    webTypesJson.contributions.html['vue-components'] = components
    return webTypesJson
}

function convertPackageJson(packageJson: Record<string, any>) {
    delete packageJson.scripts

    packageJson.name = '@yin-jinlong/h-ui'
    packageJson.version = version
    packageJson.files = [
        'dist',
        'es',
        'lib',
        'style',
        'web-types.json',
        'README.md'
    ]
    packageJson.homepage = 'https://yin-jinlong.github.io/h-ui'
    packageJson.keywords = ['vue3', 'vue-ui', 'ui']
    packageJson.repository = {
        type: 'git',
        url: 'git+https://github.com/Yin-Jinlong/h-ui.git'
    }
    packageJson.main = './lib/index.js'
    packageJson.module = './es/index.mjs'
    packageJson.types = './dist/@types/index.d.ts'
    packageJson.exports = {
        '.': {
            import: './es/index.mjs',
            require: './lib/index.js',
            types: './dist/@types/index.d.ts',
        },
        './es': {
            import: './es/index.mjs',
            types: './dist/@types/index.d.ts',
        },
        './style/*': {
            import: './style/*'
        },
        './*': './*'
    }
    return packageJson
}

async function genPackageJson() {
    let packageJson = convertPackageJson(getJson('./package.json'))
    let webTypesJson = convertWebTypesJson(getJson('./web-types.json'))

    fs.writeFileSync(node_path.resolve(config.dist, 'package.json'), JSON.stringify(packageJson, null, 2))
    fs.writeFileSync(node_path.resolve(config.dist, 'web-types.json'), JSON.stringify(webTypesJson, null, 2))
    fs.cpSync('../README.md', node_path.resolve(config.dist, 'README.md'))
}

build().then().catch(e => {
    console.error(e)
    process.exit(1)
})

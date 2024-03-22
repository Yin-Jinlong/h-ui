import fs from "fs"
import path from "path"
import readline from "readline"
import {performance} from "perf_hooks"

import {rollup, Plugin} from "rollup"
import vuePlugin from "@vitejs/plugin-vue"
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"

import {clean} from "./build-tool"
import {color, convertSize, convertTime, out, outln, OutputOption, rollupProcessPlugin} from "h-ui-build-tool"

import config from './build.config'

const startTime = performance.now()

/**
 * 进度插件
 *
 * @return Rollup插件
 */
function processPlugin(): Plugin {
    /**
     * 清空行，并到行开头
     */
    function lineStart() {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
    }

    /**
     * 输出文件大小
     *
     * @param f 文件名
     * @param size 文件大小
     */
    function outFileSize(f: string, size: number) {
        let w = process.stdout.columns
        let sizeStr = convertSize(size)
        let sizeStrLen = sizeStr.size.toString().length + sizeStr.unit.length
        // 如果空间不够了则换行
        if (w - f.length % w < sizeStrLen + 1)
            outln()
        readline.cursorTo(process.stdout, w - sizeStrLen)
        outln(color.emphasize(sizeStr.size), sizeStr.unit)
    }

    let count = 0
    return rollupProcessPlugin({
        transform(id: string) {
            let w = process.stdout.columns
            let head = `transform(${++count}) `
            let content = id
            let rw = w - head.length
            if (content.length > rw) // 超出宽度
                content = '...' + content.substring(content.length - rw + 3, content.length)
            lineStart()
            out(color.cmd('transform'), `(${count}) ${color.gray(content)}`)
        },
        buildEnd() {
            lineStart()
            outln(color.action('transformed '), color.num(count), ' modules')
        },
        writeBundle(files: string[]) {
            let sizeAll = 0
            files.forEach(f => {
                let {size} = fs.statSync(f)
                sizeAll += size
                if (config.reportOutFileInfo !== false) {
                    out(color.path(f))
                    outFileSize(f, size)
                }
            })
            let sizeStr = convertSize(sizeAll)
            outln(color.action('written '), color.num(files.length), 'files, ', color.emphasize(sizeStr.size), sizeStr.unit)
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
            if (clean(path.resolve(config.dist, o)))
                outln(color.danger('deleted '), color.path(o))
        })
    outln(color.cmd('build'), ' start...')
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
            (config.minify ?? true) ? terser() : undefined
        ]
    })

    for (const o of outs) {
        outln(color.cmd('write '), color.emphasize(o.format!), '...')
        let jsName = `[name].${o.ext ?? 'js'}`
        await build.write({
            dir: path.resolve(config.dist, o.dir),
            entryFileNames: jsName,
            chunkFileNames: jsName,
            format: o.format,
            exports: o.module ? 'named' : 'auto',
            preserveModules: o.module
        })
    }

    await build.close()
    await genPackageJson()
    fs.cpSync('global.d.ts', path.resolve(config.dist, 'es/global.d.ts'))
    fs.cpSync('global.d.ts', path.resolve(config.dist, 'lib/global.d.ts'))
    outln(color.action('took '), convertTime(performance.now() - startTime))

}

async function genPackageJson() {
    let packageJson: Record<string, any> = Object.assign({}, (await import('./package.json')).default)
    delete packageJson.scripts
    delete packageJson.devDependencies
    delete packageJson.dependencies['h-ui-build-tool']
    delete packageJson.dependencies['h-ui']
    delete packageJson.dependencies['h-ui/style/src']

    packageJson.name = 'h-ui'
    packageJson.main = './lib/index.js'
    packageJson.module = './es/index.mjs'
    packageJson.types = './es/index.d.ts'
    packageJson.exports = {
        ".": {
            import: "./es/index.mjs",
            require: "./lib/index.js",
            types: "./es/index.d.ts",
        },
        "./es": {
            import: "./es/index.mjs",
            types: "./es/index.d.ts",
        },
        "./*": "./*"
    }

    fs.writeFileSync(path.resolve(config.dist, 'package.json'), JSON.stringify(packageJson, null, 2))
}

build().then()

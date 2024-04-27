import fs from 'fs'
import {relative, resolve} from 'path'

import {transform} from 'lightningcss'
import {performance} from 'perf_hooks'
import {Compiler, initCompiler} from 'sass'

import {
    color,
    convertSize,
    convertTime,
    oraFail,
    oraStart,
    oraSucceed,
    oraText,
    outln
} from '@yin-jinlong/h-ui-build-tool'

import {cleanAndMake} from 'build-tool'

import config from 'build.config'

const startTime = performance.now()
const outPath = resolve(config.dist, config.css!.dir!)

const {action, cmd, emphasize, num, path} = color

if (config.sass?.copyDir) {
    let src = resolve(config.dist, config.sass.copyDir === true ? 'style/src' : config.sass.copyDir)
    cleanAndMake(src)
    fs.cpSync(resolve('style'), src, {
        recursive: true
    })
}

async function init() {
    return initCompiler()
}

init().then(compiler => {
    let count = 0
    let sizes = 0
    cleanAndMake(outPath)

    oraStart('compile style...')
    fs.readdirSync('style', {
        withFileTypes: true
    }).forEach((file: fs.Dirent) => {
        if (file.isFile() && file.name !== 'var.scss') {
            try {
                oraText(cmd('compile '), path(file.name))
                sizes += compile.call(compiler, file)
                count++
            } catch (e: Error | string | any) {
                oraFail(path(file.name), 'error:', e?.toString())
            }
        }
    })

    compiler.dispose()
    let {size, unit} = convertSize(sizes)
    oraSucceed(action('written '), num(count), 'files, ', emphasize(size), unit)
}).finally(() => {
    outln(action('took '), convertTime(performance.now() - startTime))
})

const encoder = new TextEncoder()

function compile(this: Compiler, file: fs.Dirent): number {
    let name = file.path + '/' + file.name

    oraText(cmd('compile '), path(file.name), '...')
    let {css} = this.compile(name, {
        charset: true
    })
    let of = `${outPath}/${file.name.slice(0, -4)}css`
    let r = transform({
        code: encoder.encode(css),
        minify: config.css?.minify ?? true,
        filename: file.name
    })
    fs.writeFileSync(of, r.code)
    let fstat = fs.statSync(of)
    let {size, unit} = convertSize(fstat.size)
    oraSucceed(path(relative('', of)), ' ', emphasize(size), unit)
    return fstat.size
}

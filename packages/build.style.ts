import fs from 'fs'
import path from 'path'

import {transform} from 'lightningcss'
import {AsyncCompiler, initAsyncCompiler} from 'sass'

import {color, convertSize, outln} from '@yin-jinlong/h-ui-build-tool'

import {cleanAndMake} from 'build-tool'

import config from 'build.config'

const outPath = path.resolve(config.dist, config.css!.dir!)

if (config.sass?.copyDir) {
    let src = path.resolve(config.dist, config.sass.copyDir === true ? 'style/src' : config.sass.copyDir)
    cleanAndMake(src)
    fs.cpSync(path.resolve('style'), src, {
        recursive: true
    })
}

initAsyncCompiler().then(compiler => {
    cleanAndMake(outPath)

    fs.readdirSync('style', {
        withFileTypes: true
    }).forEach((file: fs.Dirent) => {
        if (file.isFile() && file.name !== 'var.scss')
            compile.call(compiler, file)
    })

    compiler.dispose().then()
})

const encoder = new TextEncoder()

function compile(this: AsyncCompiler, file: fs.Dirent) {
    let name = file.path + '/' + file.name

    outln(color.cmd('compile '), color.path(file.name), '...')
    this.compileAsync(name, {
        charset: true
    }).then(({css}) => {
        let of = `${outPath}/${file.name.slice(0, -4)}css`
        let r = transform({
            code: encoder.encode(css),
            minify: config.css?.minify ?? true,
            filename: file.name
        })
        fs.writeFileSync(of, r.code)
        let {size, unit} = convertSize(fs.statSync(of).size)
        outln(color.action('write '), color.path(file.name), ' ', color.emphasize(size), unit)
    })
}

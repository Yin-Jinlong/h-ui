import fs from 'fs'
import path from "path"

import {AsyncCompiler, initAsyncCompiler} from 'sass'

import {cleanAndMake} from 'build-tool'
import {color, convertSize, outln} from 'h-ui-build-tool'
import config from 'build.config'

const outPath = path.resolve(config.dist, config.cssDir ?? 'style/css')

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


function compile(this: AsyncCompiler, file: fs.Dirent) {
    let name = file.path + '/' + file.name

    outln(color.cmd('compile '), color.path(file.name), '...')
    this.compileAsync(name, {
        charset: true
    }).then(({css}) => {
        let of = `${outPath}/${file.name.slice(0, -4)}css`
        fs.writeFileSync(of, css)
        let {size, unit} = convertSize(fs.statSync(of).size)
        outln(color.action('write '), color.path(file.name), ' ', color.emphasize(size), unit)
    })
}

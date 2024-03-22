import fs from "fs"
import {spawnSync} from 'child_process'

import {build} from 'esbuild'

async function run(file: string) {
    let outFile = ''

    function genOutFile() {
        do {
            outFile = (Math.random() * 100).toString(36) + '-tmp.mjs'
        } while (fs.existsSync(outFile))
    }

    genOutFile()
    await build({
        entryPoints: ['build.' + file + '.ts'],
        bundle: true,
        format: 'esm',
        sourcemap: 'inline',
        platform: 'node',
        outfile: outFile,
        external: ['./node_modules/*']
    })
    return outFile
}

if (process.argv.length < 3) {
    console.error('no input file!')
    process.exit(1)
}

run(process.argv[2]).then(file => {
    try {
        spawnSync(`node ${file}`, {
            cwd: process.cwd(),
            shell: true,
            stdio: 'inherit'
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
    fs.rmSync(file)
})

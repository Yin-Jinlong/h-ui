import {existsSync, readdirSync, readFileSync, rmSync,writeFileSync} from 'fs'

import {rollup} from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

async function buildBin(name) {
    console.log('build', name)
    const build = await rollup({
        input: `src/${name}/index.ts`,
        external(id) {
            return /node_modules/.test(id)
        },
        plugins: [
            typescript({
                check: false,
                tsconfigOverride: {
                    compilerOptions: {
                        sourceMap: true
                    }
                }
            }),
            json(),
            resolve(),
            commonjs(),
            terser()
        ]
    })

    await build.write({
        format: 'esm',
        dir: `dist/${name}`,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        sourcemap: 'inline'
    })
    await build.close()
}

async function run() {
    if (existsSync('dist')) {
        rmSync('dist', {
            recursive: true
        })
    }

    const packageJson = JSON.parse((await readFileSync('package.json')).toString())
    packageJson.bin = {}

    readdirSync('src', {
        withFileTypes: true
    }).forEach(file => {
        if (file.isDirectory()) {
            packageJson.bin[file.name] = `./${file.name}/index.mjs`
            buildBin(file.name)
        }
    })

    const buildTool = await rollup({
        input: 'index.ts',
        external(id) {
            return /node_modules/.test(id)
        },
        plugins: [
            typescript({
                check: false
            }),
            json(),
            resolve(),
            commonjs(),
            terser()
        ]
    })

    await buildTool.write({
        format: 'esm',
        dir: 'dist',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        exports: 'named',
        preserveModules: true,
        sourcemap: false
    })
    writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2))
    await buildTool.close()
}

await run().then()

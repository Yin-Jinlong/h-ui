import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'fs'

const SCR = 'build/src'
const DIST = 'build/dist'

const packageJson = JSON.parse((await readFileSync('build/package.json')).toString())
packageJson.bin = {}

function makeEmpty({name}) {
    let dir = `${DIST}/${name}`
    mkdirSync(dir, {
        recursive: true
    })
    packageJson.bin[name] = `./${name}/index.mjs`
    writeFileSync(`${dir}/index.mjs`, '')
}

readdirSync(SCR, {
    withFileTypes: true
}).filter(file => file.isDirectory()).forEach(makeEmpty)

writeFileSync('build/dist/package.json', JSON.stringify(packageJson, null, 2))

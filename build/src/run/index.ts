import {execSync} from 'child_process'
import {existsSync, readFileSync} from 'fs'
import * as process from 'process'

const PACKAGE_JSON = 'package.json'

let script = process.argv[2]
if (!script)
    throw new Error('No script specified')

if (!existsSync(PACKAGE_JSON))
    throw new Error(`${PACKAGE_JSON} does not exist`)

let packageJson: Record<string, any> = JSON.parse(readFileSync(PACKAGE_JSON).toString())

let scripts = packageJson['scripts']

if (!scripts)
    throw new Error(`${PACKAGE_JSON} does not have a scripts property`)

const scriptReg = new RegExp(`^${script.replace('*','.*')}$`)

let runCount = 0
Object.keys(scripts).forEach(name => {
    if (scriptReg.test(name)) {
        runCount++
        let cmd = scripts[name]
        try {
            console.log(`Running ${name}`)
            execSync(cmd, {stdio: 'inherit'})
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    }
})

if (runCount === 0)
    throw new Error(`No script found matching ${script}`)

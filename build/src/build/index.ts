import {spawnSync} from 'child_process'

if (process.argv.length < 3) {
    console.error('no input file!')
    process.exit(1)
}

try {
    spawnSync(`esno build.${process.argv[2]}.ts`, {
        cwd: process.cwd(),
        shell: true,
        stdio: 'inherit'
    })
} catch (e) {
    console.error(e)
    process.exit(1)
}

import {BuildOptions} from 'h-ui-build-tool'

const options: BuildOptions = {
    name: 'h-ui',
    dist: '../dist',
    output: [
        {
            format: 'es',
            dir: 'es',
            ext: 'mjs',
            module: true
        },
        {
            format: 'es',
            dir: 'dist',
            ext: 'all.mjs'
        },
        {
            format: 'cjs',
            dir: 'lib'
        }
    ]
}

export default options

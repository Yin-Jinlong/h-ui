import {buildOptions} from '@yin-jinlong/h-ui-build-tool'

export default buildOptions({
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
})

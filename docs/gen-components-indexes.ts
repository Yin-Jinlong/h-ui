import fs from 'fs'

let components = [] as string[]

fs.readdirSync('components', {
    withFileTypes: true
}).forEach((dir) => {
    if (dir.isDirectory()) {
        components.push(dir.name)
    }
})


let out = 'export default [\n'
components.forEach((name) => {
    out += `    {
        name: '${name}',
        path: '/${name}',
        component: () => import('./components/${name}')
    },\n`
})

out += ']\n'

fs.writeFileSync('components-indexes.ts', out)

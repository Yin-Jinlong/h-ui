import {PageGroup} from '@types'

// @ts-ignore
import components from 'indexes~'

const pages = [
    {
        label: '开始',
        items: [
            {
                name: '快速上手',
                path: '/quick-start',
                component: () => import('quick-start.vue?md')
            }
        ]
    },
    {
        label: '组件',
        items: components
    }
] as PageGroup[]

export default pages

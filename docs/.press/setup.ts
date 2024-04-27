import {Page} from '@types'
import {toggleDark} from '@yin-jinlong/h-ui'
import {Base64} from 'js-base64'
import {App} from 'vue'
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

import pages from './pages'

import './style.scss'
import './style/md.scss'
import './style/prism.scss'
import './style/prism-dark.scss'

if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toggleDark()

let componentsRoutes: RouteRecordRaw[] = []

pages.forEach(pg => pg.items.forEach((component: Page) => {
    componentsRoutes.push({
        path: component.path,
        name: component.name,
        component: component.component
    })
}))

let routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@pages/home'),
        children: componentsRoutes
    }
]

export default async function setup(app: App) {
    window.Base64 = Base64
    app.use(createRouter({
        history: createWebHashHistory(),
        routes
    }))
}

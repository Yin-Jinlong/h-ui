import {Component} from "vue"

export declare interface Page {
    name: string
    path: string
    component: Component | Promise<Component>
}

export default [
    {
        name: 'button',
        path: '/button',
        component: () => import('./pages/button')
    },
    {
        name: 'card',
        path: '/card',
        component: () => import('./pages/card')
    },
    {
        name: 'check-box',
        path: '/check-box',
        component: () => import('./pages/check-box')
    } ,
    {
        name: 'input',
        path: '/input',
        component: () => import('./pages/input')
    } ,
    {
        name: 'switch',
        path: '/switch',
        component: () => import('./pages/switch')
    }
] as Page[]

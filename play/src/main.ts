import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from "vue-router";
import './style.scss'
import App from './App.vue';

const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import('@pages/home'),
        },
        {
            path: '/button',
            component: () => import('@pages/button')
        },
        {
            path: '/card',
            component: () => import('@pages/card')
        }
    ],
    history: createWebHashHistory()
})

const app = createApp(App)
app.use(router)
app.mount(document.body)

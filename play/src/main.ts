import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from "vue-router"
import './style.scss'
import App from './App.vue'
import pages from "./pages-index"

const router = createRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('./pages/home')
        },
        ...pages
    ],
    history: createWebHashHistory()
})

const app = createApp(App)
app.use(router)
app.mount(document.body)

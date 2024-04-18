import {toggleDark} from '@yin-jinlong/h-ui'
import {App} from 'vue'

import './style.scss'
import './md.scss'

if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toggleDark()


export default async function setup(app: App) {

}

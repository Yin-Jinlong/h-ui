import {toggleDark} from '@yin-jinlong/h-ui'
import {App} from 'vue'
import {Base64} from 'js-base64'

import './style.scss'
import './style/md.scss'
import './style/prism.scss'
import './style/prism-dark.scss'

if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toggleDark()


export default async function setup(app: App) {
    window.Base64 = Base64
}

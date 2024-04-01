import {DefineComponent} from "vue"

import Running from "./running.vue"

declare interface Props {
    component?: DefineComponent
    loading: boolean
    text?: string
}

export type HLoadingProps = Props

export default {
    component:Running,
    loading: true,
    text: '',
} as Props

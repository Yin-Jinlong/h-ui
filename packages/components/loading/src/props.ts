import type {Component} from "vue"

declare interface Props {
    component?: Component
    loading: boolean
    text?: string
}

export type HLoadingProps = Props

import {PageGroup} from '@types'

declare interface Props {
    items: PageGroup[]
    now?: string
}

export type SidebarProps = Props

export default {
    items: []
} as Props

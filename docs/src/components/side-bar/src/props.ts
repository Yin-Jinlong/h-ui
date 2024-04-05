import {Page} from "@types";

declare interface Props {
    items: Page[]
    now?: string
}

export type SidebarProps = Props

export default {
    items: []
} as Props

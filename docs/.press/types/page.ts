import type {Component} from 'vue'

export declare interface Page {
    name: string
    path: string
    component: () => Promise<Component>
}

export declare interface PageGroup {
    label: string
    items: Page[]
}

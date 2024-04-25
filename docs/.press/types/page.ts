import {Component} from 'vue'

export declare interface ComponentModule {
    default: Component
}

export declare interface Page {
    name: string
    path: string
    component: () => Promise<ComponentModule>
}

export declare interface PageGroup {
    label: string
    items: Page[]
}

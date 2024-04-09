import type {App, Component, Plugin} from "vue"

export function withInstall<T extends Component>(component: T): T & Plugin {
    let c = component as T & Plugin
    c.install = (app: App) => {
        app.component(component.name!, component)
    }
    return c
}

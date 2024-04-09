import {App} from 'vue'

import {vLoading} from "./src/loading"
import {registerLoadingComponent} from './src/loading-component'

export * from './src/loading'
export * from './src/loading-circle'
export * from './src/loading-running'

export const HLoading = (app:App) => {
    app.directive('loading', vLoading)
}

export {registerLoadingComponent}

export default vLoading

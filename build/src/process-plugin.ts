import path from "path"
import {FunctionPluginHooks, NormalizedOutputOptions, OutputBundle, Plugin} from "rollup"


export declare interface ProcessPluginHook {
    transform?: (id: string) => void
    buildEnd?: () => void,
    writeBundle?: (files: string[]) => void
}

/**
 * Rollup进度插件
 * @param hook 插件钩子
 */
export function rollupProcessPlugin(hook: ProcessPluginHook) {
    return {
        name: 'process-hook',
        transform(code: string, id: string) {
            hook?.transform?.call(this, id)
        },
        buildEnd() {
            hook?.buildEnd?.call(this)
        },
        writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            if (!hook.writeBundle)
                return
            let files: string[] = []
            Object.keys(bundle).forEach((key) => {
                let dist = path.resolve(options.dir!, key)
                files.push(path.relative('./', dist))
            })
            hook.writeBundle.call(this,  files)
        }
    } as FunctionPluginHooks & Plugin
}

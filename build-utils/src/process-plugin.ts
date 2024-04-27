import path from 'path'
import {
    FunctionPluginHooks,
    NormalizedInputOptions,
    NormalizedOutputOptions,
    OutputBundle,
    Plugin,
    RenderedChunk
} from 'rollup'


export declare interface ProcessPluginHook {
    transform?: (id: string) => void
    buildEnd?: () => void,
    renderStart?:()=>void
    render?: (file: string) => void
    generateBundle?: (bundle: OutputBundle) => void
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
        renderStart(outputOptions: NormalizedOutputOptions,
                    inputOptions: NormalizedInputOptions) {
            hook?.renderStart?.call(this)
        },
        renderChunk(code: string,
                    chunk: RenderedChunk,
                    options: NormalizedOutputOptions,
                    meta: { chunks: Record<string, RenderedChunk> }) {
            hook?.render?.call(this, chunk.fileName)
        },
        generateBundle(options: NormalizedOutputOptions,
                       bundle: OutputBundle,
                       isWrite: boolean) {
            hook?.generateBundle?.call(this, bundle)
        },
        writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
            if (!hook.writeBundle)
                return
            let files: string[] = []
            Object.keys(bundle).forEach((key) => {
                let dist = path.resolve(options.dir!, key)
                files.push(path.relative('./', dist))
            })
            hook.writeBundle.call(this, files)
        }
    } as FunctionPluginHooks & Plugin
}

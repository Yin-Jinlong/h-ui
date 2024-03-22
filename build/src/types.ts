import {ModuleFormat} from 'rollup'

/**
 * 输出选项
 */
export declare interface OutputOption {
    /**
     * 输出格式
     */
    format: ModuleFormat,
    /**
     * 输出目录，相对于dist
     */
    dir: string
    /**
     * 输出（js）文件扩展名，不需要加 .
     */
    ext?: string,
    /**
     * 是否生成sourceMap，默认为false
     */
    sourceMap?: boolean | 'inline' | 'hidden'
    /**
     * 模块化，保持目录结构
     */
    module?: boolean
}

/**
 * 构建选项
 */
export declare interface BuildOptions {
    /**
     * 名称
     */
    name: string
    /**
     * 输出目录
     */
    dist: string
    /**
     * 构建前删除dist，默认为true
     */
    deleteBeforeBuild?: boolean
    /**
     * 输出选项
     */
    output: OutputOption | OutputOption[]
    /**
     * 压缩js代码，默认为true
     */
    minify?: boolean
    /**
     * 报告输出文件详情，位置大小等，默认为true
     */
    reportOutFileInfo?: boolean
    css?: {
        /**
         * 编译scss文件输出目录，相对于dist
         */
        dir?: string,
        minify?: boolean
    }
}

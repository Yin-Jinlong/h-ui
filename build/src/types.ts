import {ModuleFormat, Plugin} from 'rollup'

/**
 * 输出选项
 */
export declare interface OutputOption {
    /**
     * 输出格式
     */
    format: ModuleFormat,
    /**
     * 输出目录，可以是相对路径，也可以是绝对路径
     */
    dir: string
    /**
     * 输出（js）文件扩展名，不需要加 .
     */
    ext?: string,
    /**
     * 是否生成sourceMap，默认为false
     */
    sourceMap?: boolean | 'inline' | 'hidden',
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
     * 是否保留模块
     */
    preserveModules?: boolean
    /**
     * 输出选项
     */
    output: OutputOption | OutputOption[]
    /**
     * 报告输出文件详情，位置大小等，默认为true
     */
    reportOutFileInfo?: boolean
}

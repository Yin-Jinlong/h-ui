import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'

/**
 * 消息提示配置
 */
export interface HMessageConfig {
    icon?: Comment | string
    color?: DefinedNamedColor | string
    /**
     * 显示时长
     *
     * @default 3000
     */
    duration?: number
    /**
     * 是否可关闭
     *
     * @default true
     */
    closeable?: boolean
    /**
     * 关闭时触发
     */
    onClose?: (id: number) => void
}

export interface HMessage {
    show(msg: string, config?: HMessageConfig): number

    close(id: number): void

    closeAll(): void

    primary(msg: string, config?: HMessageConfig): number

    success(msg: string, config?: HMessageConfig): number

    error(msg: string, config?: HMessageConfig): number

    danger(msg: string, config?: HMessageConfig): number

    warning(msg: string, config?: HMessageConfig): number

    info(msg: string, config?: HMessageConfig): number

    emphasize(msg: string, config?: HMessageConfig): number

}

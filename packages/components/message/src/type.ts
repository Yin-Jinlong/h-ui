import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'
import {RendererElement, RendererNode, VNode} from 'vue'

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

export type MSGContent = string | VNode<RendererNode, RendererElement, {
    [p: string]: any }
>

export interface HMessage {
    show(msg: string, config?: HMessageConfig): number

    close(id: number): void

    closeAll(): void

    primary(msg: MSGContent, config?: HMessageConfig): number

    success(msg: MSGContent, config?: HMessageConfig): number

    error(msg: MSGContent, config?: HMessageConfig): number

    danger(msg: MSGContent, config?: HMessageConfig): number

    warning(msg: MSGContent, config?: HMessageConfig): number

    info(msg: MSGContent, config?: HMessageConfig): number

    emphasize(msg: MSGContent, config?: HMessageConfig): number

}

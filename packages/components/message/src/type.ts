import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'

export interface HMessageConfig {
    icon?: Comment | string
    color?: DefinedNamedColor | string
    duration?: number
    closeable?: boolean
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

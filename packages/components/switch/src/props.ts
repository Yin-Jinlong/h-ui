import {BindSize, DefinedNamedColor, NamedSize} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HSwitchProps extends BindSize {
    /**
     * 开启时颜色
     */
    onColor?: DefinedNamedColor | string
    /**
     * 关闭时颜色
     */
    offColor?: DefinedNamedColor | string
    /**
     * 显示默认开关文字
     */
    actionText?: boolean

    size?: NamedSize
}


export default {
    size: 'normal',
    onColor: 'primary',
    offColor: '',
    actionText: false
} as PropsDefaultType<HSwitchProps>

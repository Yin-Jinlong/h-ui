import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HSwitchProps extends BindSize, Disable {
    /**
     * 开启时颜色
     */
    onColor?: DefinedNamedColor | String
    /**
     * 关闭时颜色
     */
    offColor?: DefinedNamedColor | String
    /**
     * 显示默认开关文字
     */
    actionText?: boolean
}


export default {
    size: 'normal',
    onColor() {
        return ''
    },
    offColor() {
        return ''
    },
    actionText: false
} as PropsDefaultType<HSwitchProps>

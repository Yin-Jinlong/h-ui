import {BindSize, DefinedNamedColor, NamedSize} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

import {HButtonShadowType, HButtonType} from './type'

export declare interface HButtonProps extends BindSize {
    /**
     * 按钮类型
     */
    type?: HButtonType
    /**
     * 按钮颜色
     */
    color?: DefinedNamedColor | string
    /**
     * 边框
     */
    border?: boolean
    /**
     * 阴影
     */
    shadow?: HButtonShadowType
    /**
     * 圆形
     */
    round?: boolean

    size?: NamedSize
}


export default {
    type: '',
    color: 'primary',
    border: false,
    shadow: false,
    size: 'normal'
} as PropsDefaultType<HButtonProps>

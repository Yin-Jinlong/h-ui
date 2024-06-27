import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

import {HButtonShadowType, HButtonType} from './type'

export declare interface HButtonProps extends Disable, BindSize {
    /**
     * 按钮类型
     */
    type?: HButtonType
    /**
     * 按钮颜色
     */
    color?: DefinedNamedColor | String
    /**
     * 边框
     */
    border?: boolean
    /**
     * 阴影
     */
    shadow?: HButtonShadowType
}


export default {
    type: '',
    border: false,
    shadow: false,
    size: 'normal'
} as PropsDefaultType<HButtonProps>

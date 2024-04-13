import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'

import {HButtonShadowType, HButtonType} from './type'

export declare interface HButtonProps extends Disable, BindSize {
    type?: HButtonType
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: HButtonShadowType
}


export default {
    type: '',
    border: false,
    shadow: false,
    size: 'normal'
} as HButtonProps

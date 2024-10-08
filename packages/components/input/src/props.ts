import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

import {HInputType} from './type'

export declare interface HInputProps extends Disable, BindSize {
    placeholder?: string
    color?: DefinedNamedColor | string
    textColor?: DefinedNamedColor | string
    type?: HInputType
    border?: boolean
    maxlength?: number
}


export default {
    size: 'normal',
    color: '',
    textColor: '',
    type: 'text',
    border: true
} as PropsDefaultType<HInputProps>

import {BindSize, DefinedNamedColor} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

import {HInputType} from './type'

export declare interface HInputProps extends BindSize {
    placeholder?: string
    color?: DefinedNamedColor | string
    textColor?: DefinedNamedColor | string
    type?: HInputType
    border?: boolean
    maxlength?: number
}


export default {
    size: 'normal',
    color: 'primary',
    textColor: '',
    type: 'text',
    border: true
} as PropsDefaultType<HInputProps>

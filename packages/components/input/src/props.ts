import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'

import {HInputType} from './type'

declare interface Props extends Disable, BindSize {
    placeholder?: string
    color?: DefinedNamedColor | string
    textColor?: DefinedNamedColor | string
    type?: HInputType
    border?: boolean
    maxlength?: number
}

export type HInputProps = Props

export default {
    size: 'normal',
    color: '',
    textColor: '',
    type: 'text',
    border: true
} as Props

import {BindSize, DefinedNamedColor, Disable} from '@yin-jinlong/h-ui/types'

declare interface Props extends BindSize, Disable {
    onColor?: DefinedNamedColor | string
    offColor?: DefinedNamedColor | string
}

export type HSwitchProps = Props

export default {
    size: 'normal',
    onColor: '',
    offColor: '',
} as Props

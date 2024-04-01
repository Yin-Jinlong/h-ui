import {DefinedNamedColor, Disable, NamedSize} from "@yin-jinlong/h-ui/types";

declare interface Props extends Disable {
    size?: NamedSize
    onColor?: DefinedNamedColor | string
    offColor?: DefinedNamedColor | string
}

export type HCheckBoxProps = Props

export default {
    size: 'normal',
    onColor: '',
    offColor: ''
} as Props

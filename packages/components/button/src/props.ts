import {BindSize, DefinedNamedColor, Disable} from "@yin-jinlong/h-ui/types"

import {HButtonShadowType, HButtonType} from "./type"

declare interface Props extends Disable, BindSize {
    type?: HButtonType
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: HButtonShadowType
}

export type HButtonProps = Props

export default {
    type: '',
    border: false,
    shadow: false,
    size: 'normal'
} as Props

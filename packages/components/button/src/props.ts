import type {BindSize, DefinedNamedColor, Disable} from "@yin-jinlong/h-ui/types"

import type {HButtonShadowType, HButtonType} from "./type"

declare interface Props extends Disable, BindSize {
    type?: HButtonType
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: HButtonShadowType
}

export type HButtonProps = Props

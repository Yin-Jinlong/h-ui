import type {BindSize, DefinedNamedColor, Disable} from "@yin-jinlong/h-ui/types"

import type {HInputType} from "./type"

declare interface Props extends Disable, BindSize {
    placeholder?: string
    color?: DefinedNamedColor | string
    textColor?: DefinedNamedColor | string
    type?: HInputType
    maxlength?: number
}

export type HInputProps = Props

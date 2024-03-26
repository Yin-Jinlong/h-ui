import {DefinedNamedColor, Disable, NamedSize} from "../../../types"


declare interface CheckBoxProps extends Disable {
    size?: NamedSize
    color?: DefinedNamedColor | string
}

export type HCheckBoxProps = CheckBoxProps
export type HCheckBoxSize = NamedSize

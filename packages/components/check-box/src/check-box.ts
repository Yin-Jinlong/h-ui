import {DefinedNamedColor, Disable, NamedSize} from "../../../types"


declare interface CheckBoxProps extends Disable {
    size?: NamedSize
    onColor?: DefinedNamedColor | string
    offColor?: DefinedNamedColor | string
}

export type HCheckBoxProps = CheckBoxProps

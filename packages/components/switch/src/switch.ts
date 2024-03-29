import {BindSize, DefinedNamedColor, Disable} from "../../../types"

declare interface SwitchProps extends BindSize, Disable {
    onColor?: DefinedNamedColor | string
    offColor?: DefinedNamedColor | string
}

export type HSwitchProps = SwitchProps;

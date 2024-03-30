import {BindSize, DefinedNamedColor, Disable} from "../../../types"

type InputType = 'color' |
    'date' |
    'datetime-local' |
    'email' |
    'month' |
    'number' |
    'password' |
    'tel' |
    'text' |
    'time' |
    'url' |
    'week'

declare interface InputProps extends Disable, BindSize {
    placeholder?: string
    color?: DefinedNamedColor | string
    textColor?: DefinedNamedColor | string
    type?: InputType
    maxlength?: number
}

export type HInputProps = InputProps
export type HInputType = InputType

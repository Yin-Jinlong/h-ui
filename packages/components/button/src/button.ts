import {BindSize, DefinedNamedColor, Disable} from "../../../types"

/**
 * 按钮样式
 */
type ButtonType = '' | 'primary' | 'text' | 'plain'
type ButtonShadowType = boolean | 'always' | 'hover'

declare interface ButtonProps extends Disable, BindSize {
    type?: ButtonType
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: ButtonShadowType
}

export type HButtonProps = ButtonProps
export type HButtonType = ButtonType
export type HButtonShadowType = ButtonShadowType

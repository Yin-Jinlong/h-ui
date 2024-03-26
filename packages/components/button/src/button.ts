import {DefinedNamedColor, Disable, NamedSize} from "../../../types"

/**
 * 按钮样式
 */
type ButtonType = '' | 'primary' | 'text' | 'plain'
type ButtonShadowType = boolean | 'always' | 'hover'

declare interface ButtonProps extends Disable {
    type?: ButtonType
    size?: NamedSize
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: ButtonShadowType
}

export type HButtonProps = ButtonProps
export type HButtonSize = NamedSize
export type HButtonType = ButtonType
export type HButtonShadowType = ButtonShadowType

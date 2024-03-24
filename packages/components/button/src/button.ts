import {DefinedNamedColor, Disable} from "../../../types"

/**
 * 按钮样式
 */
type ButtonType = '' | 'primary' | 'text' | 'plain'
type ButtonSize = 'default' | 'small' | 'large' | 'xlarge'
type ButtonShadowType = boolean | 'always' | 'hover'

declare interface ButtonProps extends Disable {
    type?: ButtonType
    size?: ButtonSize
    color?: DefinedNamedColor | string
    border?: boolean
    shadow?: ButtonShadowType
}

export type HButtonProps = ButtonProps
export type HButtonSize = ButtonSize
export type HButtonType = ButtonType
export type HButtonShadowType = ButtonShadowType

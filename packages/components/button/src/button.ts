import {DefinedNamedColor} from "../../../types"
import {ExtractPropTypes} from "vue";

/**
 * 按钮样式
 */
type ButtonType = '' | 'primary' | 'text' | 'plain'
type ButtonSize = 'default' | 'small' | 'large' | 'xlarge'

const buttonProps = {
    type: {
        type: String as () => ButtonType,
        require: true
    },
    size: {
        type: String as () => ButtonSize,
        default: 'default',
        require: false
    },
    color: {
        type: String as () => DefinedNamedColor | string,
        default: undefined,
        require: false
    },
    border: {
        type: Boolean,
        default: false,
        require: false
    },
    shadow: {
        type: Boolean,
        default: false,
        require: false
    }
} as const

export type HButtonProps = ExtractPropTypes<typeof buttonProps>

export type HButtonSize = HButtonProps['size']
export type HButtonType = HButtonProps['type']

export {
    buttonProps
}

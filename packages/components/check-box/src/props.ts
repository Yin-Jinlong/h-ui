import {DefinedNamedColor, NamedSize} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HCheckBoxProps {
    /**
     * 尺寸
     */
    size?: NamedSize
    /**
     * 开启时的颜色
     */
    onColor?: DefinedNamedColor | string
    /**
     * 关闭时的颜色
     */
    offColor?: DefinedNamedColor | string
}


export default {
    size: 'normal',
    onColor: '',
    offColor: ''
} as PropsDefaultType<HCheckBoxProps>

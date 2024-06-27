import {DefinedNamedColor, Disable, NamedSize} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HCheckBoxProps extends Disable {
    /**
     * 尺寸
     */
    size?: NamedSize
    /**
     * 开启时的颜色
     */
    onColor?: DefinedNamedColor | String
    /**
     * 关闭时的颜色
     */
    offColor?: DefinedNamedColor | String
}


export default {
    size: 'normal',
    onColor(){
        return ''
    },
    offColor(){
        return ''
    }
} as PropsDefaultType<HCheckBoxProps>

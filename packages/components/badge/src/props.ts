import {HBadgeOverflow} from '@yin-jinlong/h-ui/components'
import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'
import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HBadgeProps {
    /**
     * 显示的值
     */
    value?: number | string
    /**
     * 颜色
     */
    color?: DefinedNamedColor | String
    /**
     * 最小值，小于该值将不显示。类型为number时生效
     */
    min?: number
    /**
     * 最大值
     */
    max?: number
    /**
     * 超出最大值时的显示方式
     */
    overflow?: HBadgeOverflow
    /**
     * 显示为点
     */
    dot?: boolean
}

export default {
    value: 1,
    color: 'danger',
    min: 1,
    max: 99,
    overflow: 'max-plus'
} as PropsDefaultType<HBadgeProps>

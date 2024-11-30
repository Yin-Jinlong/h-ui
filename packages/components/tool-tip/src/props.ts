import {PropsDefaultType} from '@yin-jinlong/h-ui/types/props'

export declare interface HToolTipProps {
    /**
     * zIndex，默认10000
     */
    zIndex?: number
    /**
     * 提示的类名
     */
    tipClass?: string
    /**
     * 提示偏移，默认8
     */
    offset?: number
    /**
     * 提示位置，默认auto
     */
    place?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
    /**
     * 是否在body上显示，默认false
     */
    body?: boolean
    /**
     * 显示时间，默认2000
     */
    timeout?:number
}

export default {
    zIndex: 10000,
    offset: 8,
    place: 'auto',
    body: false,
    timeout: 2000,
} as PropsDefaultType<HToolTipProps>

import {DefinedNamedColor} from '@yin-jinlong/h-ui/types'
import chroma from 'chroma-js'

import {cssVar} from './css'

export const DefinedNamedColors: DefinedNamedColor[] = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'emphasize'
]

export function isDefinedNamedColor(color: string): boolean {
    return DefinedNamedColors.includes(color as DefinedNamedColor)
}

/**
 *
 * 转换颜色，如果是预定义颜色，则返回预定义颜色对应的变量
 *
 * @param color 颜色
 * @param suffix 后缀
 * @param notDNCCallback 不是预定义颜色时的回调，返回颜色
 */
export function convertColor(color: string, suffix?: string, notDNCCallback?: (color: string) => string) {
    if (isDefinedNamedColor(color))
        return cssVar(`color-${color}${suffix ? '-' + suffix : ''}`)
    return (suffix && notDNCCallback) ? notDNCCallback(color) : color
}

/**
 *
 * 改变颜色亮度
 *
 * @param color 颜色
 * @param dl 变化值
 */
export function changeLight(color: string, dl: number) {
    let c = chroma(color)
    let hslColor = c.hsl()
    let l = hslColor[2] + dl
    if (l < 0)
        l = 0
    else if (l > 1)
        l = 1
    return chroma.hsl(hslColor[0], hslColor[1], l).hex()
}

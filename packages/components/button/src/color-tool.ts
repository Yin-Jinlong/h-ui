import {DefinedNamedColor} from "../../../types"
import chroma, {Color, hsl} from "chroma-js"

const namedColors = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize']

/**
 * 生成button颜色
 *
 * @description css变量
 *
 * @param color 颜色
 * @param lightenCount 淡化数量
 * @param darkenCount 加深数量
 * @return css变量
 *
 * @author yjl
 */
export function genColor(color: string | DefinedNamedColor, lightenCount: number, darkenCount: number): string[] {
    let btnColors: string[] = []

    const add = (color: string | Color) => btnColors.push(color.toString())

    if (namedColors.includes(color)) {
        const addVar = (str: string=color) => add(`var(--h-color-${str})`)

        addVar()
        for (let i = 1; i <= lightenCount; i++)
            addVar(`${color}-${i}`)
        for (let i = 1; i <= darkenCount; i++)
            addVar(`${color}--${i}`)
    } else {
        let c = chroma(color).hsl()
        const addL = (dl: number = 0) => add(hsl(c[0], c[1], c[2] + dl))

        addL()
        for (let i = 1; i <= lightenCount; i++)
            addL(0.05 * i)
        for (let i = 1; i <= darkenCount; i++)
            addL(-0.05 * i)
    }
    return btnColors
}

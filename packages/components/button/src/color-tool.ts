import {DefinedNamedColor} from "../../../types"
import chroma, {hsl} from "chroma-js"

const namedColors = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize']

export function genColor(color: string | DefinedNamedColor, lightenCount: number, darkenCount: number): string[] {
    let btnColors = []
    if (namedColors.includes(color)) {
        btnColors.push(`var(--h-color-${color})`)
        for (let i = 1; i <= lightenCount; i++)
            btnColors.push(`var(--h-color-${color}-${i})`)
        for (let i = 1; i <= darkenCount; i++)
            btnColors.push(`var(--h-color-${color}--${i})`)
    } else {
        let c = chroma(color).hsl()
        btnColors.push(hsl(...c).toString())
        for (let i = 1; i <= lightenCount; i++)
            btnColors.push(hsl(c[0], c[1], c[2] + 0.05 * i).toString())
        for (let i = 1; i <= darkenCount; i++)
            btnColors.push(hsl(c[0], c[1], c[2] - 0.05 * i).toString())
    }
    return btnColors
}

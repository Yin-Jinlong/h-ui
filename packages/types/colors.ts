import {cssVar} from "../utils";

export type DefinedNamedColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'emphasize'

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

export function convertColor(color: string) {
    if (isDefinedNamedColor(color))
        return cssVar(`color-${color}`)
    return color
}

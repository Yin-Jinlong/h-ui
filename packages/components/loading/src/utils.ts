export function mergeStyle(element: Element, s: {
    [key in keyof CSSStyleDeclaration]?: string
}) {
    Object.assign((element as HTMLElement).style, s)
}

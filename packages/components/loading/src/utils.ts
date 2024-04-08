type Styleable =
    CSSStyleDeclaration &
    SVGCircleElement &
    SVGDefsElement &
    SVGElement &
    SVGFilterElement &
    SVGImageElement &
    SVGLineElement &
    SVGLinearGradientElement &
    SVGMarkerElement &
    SVGPathElement &
    SVGPolygonElement &
    SVGPolylineElement &
    SVGRadialGradientElement &
    SVGStopElement &
    SVGTextElement &
    SVGTextPathElement &
    SVGUseElement

export function mergeStyle(element: Element, s: {
    [key in keyof Styleable]?: string
}) {
    Object.assign((element as HTMLElement).style, s)
}

const toolsAnimOptions: KeyframeAnimationOptions = {
    duration: 200,
    easing: 'ease-out',
    fill: 'forwards'
}

export function enter(el: Element, done: () => void) {
    el.animate({
        opacity: [0, 1],
        scale: ['1 0', '1 1']
    }, toolsAnimOptions).onfinish = done
}

export function leave(el: Element, done: () => void) {
    el.animate({
        opacity: [1, 0],
        scale: ['1 1', '1 0']
    }, toolsAnimOptions).onfinish = done
}

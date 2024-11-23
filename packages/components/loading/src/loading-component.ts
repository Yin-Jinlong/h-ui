import {convertColor, cssVar, cssVarName} from '@yin-jinlong/h-ui/utils'
import {Component, createCommentVNode, defineComponent, h, onMounted, ref, Transition, VNode, withCtx} from 'vue'
import {Circle} from './loading-circle'

import {Running} from './loading-running'
import {ComponentFn, HLoadingOptions} from './type'
import {mergeStyle} from './utils'

interface LoadingElement extends HTMLElement {
    [OVERFLOW_KEY]: string
}

const OVERFLOW_KEY = Symbol('overflow')

const NAMED_LOADINGS: Record<string, (ComponentFn)> = {
    running: Running,
    circle: Circle
}

const animConfig = {
    duration: 200,
    fill: 'forwards',
    easing: 'ease-in'
} as KeyframeAnimationOptions

function vIf(v: boolean | undefined, content: VNode, comment: string = 'if'): VNode {
    if (v)
        return content
    return createCommentVNode(comment)
}

function Loading(el: HTMLElement, options: HLoadingOptions): VNode {

    const root = ref<HTMLElement>()

    function addStyle(root: HTMLElement) {
        let inner = options.inner
        mergeStyle(root, {
            alignItems: 'center',
            backgroundColor: inner ? 'transparent' : cssVar('loading-modal-color'),
            color: inner ? 'inherit' : cssVar('loading-color'),
            display: 'inline-flex',
            flexDirection: 'column',
            height: inner ? 'max-content' : '100%',
            justifyContent: 'center',
            left: inner ? '0' : `${el.scrollLeft}px`,
            position: inner ? 'relative' : 'absolute',
            top: inner ? '0' : `${el.scrollTop}px`,
            verticalAlign: 'middle',
            width: inner ? 'max-content' : '100%',
            zIndex: inner ? undefined : '2147483647',
        })

        let modal = ((model) => {
            if (typeof model === 'boolean') {
                return model ? 'rgba(0,0,0,0.6)' : 'transparent'
            }
            return convertColor(model)
        })(options.modal)

        root.style.setProperty(cssVarName('loading-color'), convertColor(options.color))
        root.style.setProperty(cssVarName('loading-modal-color'), modal)
        root.style.setProperty(cssVarName('loading-size'), options.size)
        root.style.setProperty(cssVarName('loading-stroke-width'), options.width)
    }

    let loadingComponent = () => {
        if (typeof options.component === 'string') {
            let c = NAMED_LOADINGS[options.component]
            if (!c)
                throw new Error(`${options.component} is not a valid loading component name`)
            return c()
        }
        return options.component
    }

    function setup() {
        onMounted(() => {
            addStyle(root.value!)
        })
        return () => h(options.inner ? 'span' : 'div', {
            ref: root,
        }, [
            h('div', {
                style: {
                    display: 'inline-block',
                    width: cssVar('loading-size', '30px'),
                    height: cssVar('loading-size', '30px'),
                }
            }, [h(loadingComponent())]),
            vIf(!!options.text && !options.inner, h('div', {
                    'data-flex-column-center': ''
                }, [options.text]),
                'loading-text'
            )
        ])
    }

    return h(defineComponent(
        {
            setup
        }
    ))
}

export function createLoadingComponent(el: HTMLElement, options: HLoadingOptions, onLeaveEnd: () => void): Component {

    function enter(e: Element, done: () => void) {
        (el as LoadingElement)[OVERFLOW_KEY] = el.style.overflow
        el.style.overflow = 'hidden'
        e.animate({
            opacity: [0, 1]
        }, animConfig).onfinish = done
    }

    function leave(e: Element, done: () => void) {
        e.animate({
            opacity: [1, 0]
        }, animConfig).onfinish = () => {
            el.style.overflow = (el as LoadingElement)[OVERFLOW_KEY]
            done()
            onLeaveEnd()
        }
    }

    return defineComponent({
        name: 'HLoading',
        setup(_, ctx) {
            return () => {
                return h(
                    Transition,
                    {
                        appear: true,
                        onAppear: enter,
                        onLeave: leave,
                    }, {
                        default: withCtx(() => [vIf(options.loading, Loading(el, options))])
                    }
                )
            }
        }
    })
}

/**
 * 注册全局loading组件，在vLoading的component中使用
 * @param name 注册名
 * @param component 组件
 */
export function registerLoadingComponent(name: string, component: ComponentFn) {
    if (NAMED_LOADINGS[name])
        throw new Error(`${name} is already registered`)
    NAMED_LOADINGS[name] = component
}

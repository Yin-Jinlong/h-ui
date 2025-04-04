import {HBadge, HButton, HCard, MSGContent} from '@yin-jinlong/h-ui/components'
import {changeLight, clampLight, convertColor, isDark} from '@yin-jinlong/h-ui/utils'
import {
    defineComponent,
    h,
    reactive,
    ref,
    TransitionGroup,
    createApp,
    Ref,
    TransitionGroupProps,
    VNode,
    watch
} from 'vue'
import {HMessage, HMessageConfig} from './type'

let mid = 0

interface RawMsg {
    id: number
    msg: MSGContent
    timer: number
    duration: number
    color: string
    onClose?: (id: number) => void
    closeable: boolean
    mergeId?: string
    count: number
}

let contents: RawMsg[] = []

function messageEnter(el: HTMLElement, done: () => void) {
    el.style.left = `0px`
    el.style.position = 'relative'
    el.animate({
        opacity: [0, 1],
        top: ['-50px', '0'],
    }, {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
    }).onfinish = () => {
        el.style.position = 'static'
        done()
    }
}

function messageLeave(el: HTMLElement, done: () => void) {
    el.style.left = `calc(50% - ${el.offsetWidth / 2}px)`
    let {top} = el.getBoundingClientRect()
    el.style.position = 'absolute'
    el.style.transformOrigin = 'top center'
    el.style.zIndex = '-1'
    el.animate({
        opacity: [1, 0],
        top: [`${top}px`, `${top - el.offsetHeight / 2}px`],
        scale: ['1 1', '1 0'],
    }, {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
    }).onfinish = done
}

let dark: Ref<boolean>

function genColor(color: string, lv: number, dv: number) {
    return clampLight(changeLight(color, (dark.value ? dv : lv) * 0.05), 0.05, 0.95)
}

function ifOrDef<T>(b: boolean, v: T, def?: T) {
    return b ? v : def
}

function createContent(msg: MSGContent): VNode {
    if (typeof msg === 'string') {
        return h('span', msg)
    } else {
        return msg
    }
}

function createMessage(msg: RawMsg, resetTimeout: () => void) {
    return h(HCard, {
        key: msg.id,
        style: {
            backgroundColor: convertColor(msg.color, dark.value ? '-8' : '8',
                c => genColor(c, 8, -8)),
            color: convertColor(msg.color),
            border: `solid 1px ${convertColor(msg.color, dark.value ? '-6' : '5',
                c => genColor(c, 5, -6))}`,
            pointerEvents: 'auto',
            zIndex: msg.id,
            left: '0',
            top: '0',
            margin: '1rem auto',
            width: 'fit-content',
            minWidth: '100px',
            maxWidth: '80%',
            padding: '0.5rem 1rem',
        }
    }, {
        default() {
            return h('div', {
                onMousemove() {
                    resetTimeout()
                },
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }, [h('p', {
                style: ifOrDef(msg.closeable, {
                    paddingRight: '0.5em'
                }, {})
            }, [createContent(msg.msg)]), ifOrDef(msg.closeable, h(HButton, {
                type: 'link',
                color: msg.color,
                style: {
                    position: 'absolute',
                    right: '0'
                },
                onClick() {
                    close(msg.id)
                }
            }, {
                default() {
                    return '✕'
                }
            })), h(HBadge, {
                value: msg.count,
                min: 2,
                style: {
                    transform: 'translate(3em,-50%)'
                }
            })])
        }
    })
}

function createContainer() {
    return defineComponent({
        name: 'HMessageContainer',
        setup(_, ctx) {
            contents = reactive<RawMsg[]>(contents)
            dark = ref(isDark())
            return () => {
                let list = []
                for (let i = 0; i < contents.length; i++) {
                    let msg = contents[i]

                    function resetTimeout() {
                        if (!msg.duration)
                            return
                        clearTimeout(msg.timer)
                        if (msg.duration > 0) {
                            msg.timer = setTimeout(() => {
                                close(msg.id)
                            }, msg.duration) as unknown as number
                        }
                    }

                    list.push(createMessage(msg, resetTimeout))
                }
                return h(TransitionGroup, {
                    moveClass: 'transition-all',
                    onEnter: messageEnter as TransitionGroupProps['onEnter'],
                    onLeave: messageLeave as TransitionGroupProps['onLeave'],
                }, {
                    default() {
                        return list
                    }
                })
            }
        }
    })
}

const app = createApp(createContainer())
const div = document.createElement('div')

div.setAttribute('h-message-container', '')
div.style.position = 'fixed'
div.style.top = '0'
div.style.left = '0'
div.style.width = '100%'
div.style.pointerEvents = 'none'
div.style.zIndex = '2147483647'
app.mount(div)

addEventListener('theme-change', (e) => {
    dark.value = isDark()
})

function show(msg: MSGContent, config?: HMessageConfig): number {
    let id = mid
    let timeOutId = 0
    let dur = config?.duration ?? 3000

    let i = config?.mergeId ? contents.findIndex(v => v.mergeId === config.mergeId) : -1
    if (i >= 0) {
        let c = contents[i]
        clearTimeout(c.timer)
        if (dur > 0) {
            timeOutId = setTimeout(() => {
                close(c.id)
            }, dur) as unknown as number
        }
        c.count++
        c.msg = msg
        c.timer = timeOutId
        c.duration = dur
        c.color = config?.color ?? 'primary'
        c.onClose = config?.onClose
        return id
    } else {
        if (dur > 0) {
            timeOutId = setTimeout(() => {
                close(id)
            }, dur) as unknown as number
        }
        contents.push({
            id: mid,
            msg: msg,
            timer: timeOutId,
            duration: dur,
            color: config?.color ?? 'primary',
            onClose: config?.onClose,
            closeable: config?.closeable ?? true,
            mergeId: config?.mergeId,
            count: 1
        })
    }

    if (!div.parentElement) {
        document.body.append(div)
    }

    return mid++
}

function close(id: number): void {
    let index = contents.findIndex(v => v.id === id)
    if (index > -1) {
        let msg = contents[index]
        clearTimeout(msg.timer)
        msg.onClose?.(msg.id)
        contents.splice(index, 1)
        if (contents.length == 0) {
            setTimeout(() => {
                div.remove()
            }, 300)
        }
    }
}

export default {
    show,
    close,
    closeAll() {
        // 只关闭调用时的消息
        // 在没执行关闭前插入的消息不关闭
        let closeIds: number[] = []
        contents.forEach(v => {
            closeIds.push(v.id)
        })
        closeIds.forEach(id => {
            close(id)
        })
    }, danger(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'danger',
            ...config
        })
    }, emphasize(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'emphasize',
            ...config
        })
    }, error(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'danger',
            ...config
        })
    }, info(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'info',
            ...config
        })
    }, primary(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'primary',
            ...config
        })
    }, success(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'success',
            ...config
        })
    }, warning(msg: MSGContent, config?: HMessageConfig): number {
        return show(msg, {
            color: 'warning',
            ...config
        })
    }
} as HMessage

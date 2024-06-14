import {HCard} from '@yin-jinlong/h-ui/components'
import {changeLight, convertColor, isDark} from '@yin-jinlong/h-ui/utils'
import {createApp, defineComponent, h, reactive, ref, Ref, TransitionGroup, TransitionGroupProps} from 'vue'
import {HMessage, HMessageConfig} from './type'

let mid = 0

interface RawMsg {
    id: number
    msg: string
    timer: number
    color: string
    onClose?: (id: number) => void
}

let contents: RawMsg[]

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
    el.style.zIndex = '-1'
    el.animate({
        opacity: 0,
        top: `${top - el.offsetHeight}px`,
        scale: 0,
    }, {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
    }).onfinish = done
}

let dark: Ref<boolean>

function genColor(color: string, lv: number, dv: number) {
    return changeLight(color, (dark.value ? dv : lv) * 0.05)
}

function createContainer() {
    return defineComponent({
        name: 'HMessageContainer',
        setup(_, ctx) {
            contents = reactive<RawMsg[]>([])
            dark = ref(isDark())
            return () => {
                let list = []
                for (let i = 0; i < contents.length; i++) {
                    let msg = contents[i]
                    list.push(h(HCard, {
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
                            transform: 'translateX(0)',
                            margin: '0 auto 1rem',
                            textAlign: 'center',
                            width: 'fit-content',
                            minWidth: '100px',
                            maxWidth: '80%',
                            padding: '0.5rem 1rem',
                        }
                    }, {
                        default() {
                            return msg.msg
                        }
                    }))
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

window.onload = () => {
    div.setAttribute('h-message-container', '')
    div.style.position = 'fixed'
    div.style.top = '0'
    div.style.left = '0'
    div.style.width = '100%'
    div.style.pointerEvents = 'none'
    app.mount(div)
    document.body.append(div)

    addEventListener('theme-change', (e) => {
        dark.value = isDark()
    })

}

function show(msg: string, config?: HMessageConfig): number {
    let id = mid
    let timeOutId = 0
    let dur = config?.duration ?? 3000

    if (dur > 0) {
        timeOutId = setTimeout(() => {
            close(id)
        }, dur) as unknown as number
    }
    contents.push({
        id: mid,
        msg: msg,
        timer: timeOutId,
        color: config?.color ?? 'primary',
        onClose: config?.onClose,
    })
    return mid++
}

function close(id: number): void {
    let index = contents.findIndex(v => v.id === id)
    if (index > -1) {
        let msg = contents[index]
        clearTimeout(msg.timer)
        msg.onClose?.(msg.id)
        contents.splice(index, 1)
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
    }, danger(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'danger',
            ...config
        })
    }, emphasize(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'emphasize',
            ...config
        })
    }, error(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'danger',
            ...config
        })
    }, info(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'info',
            ...config
        })
    }, primary(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'primary',
            ...config
        })
    }, success(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'success',
            ...config
        })
    }, warning(msg: string, config?: HMessageConfig): number {
        return show(msg, {
            color: 'warning',
            ...config
        })
    }
} as HMessage

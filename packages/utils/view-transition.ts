type ViewTransitionCallback = () => void | Promise<void>

/**
 *
 * 视图转场
 *
 * @param init 初始化回调，用于新视图初始化
 * @param before startViewTransition前的调用
 * @param anim 开始动画
 * @param end 动画结束
 * @param finallyFn 无论startViewTransition是否成功，都会在函数返回前调用
 *
 * @author YJL
 */
export async function viewTransition(
    init: ViewTransitionCallback,
    before?: ViewTransitionCallback | null,
    anim?: ViewTransitionCallback | null,
    end?: ViewTransitionCallback | null,
    finallyFn?: ViewTransitionCallback | null,
): Promise<void> {
    if (document.startViewTransition) {
        try {
            await before?.()
            const t = document.startViewTransition(init)
            await t.ready
            await anim?.()
            await t.finished
            await end?.()
        } finally {
            await finallyFn?.()
        }
    } else {
        await init()
    }
}

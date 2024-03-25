<template>
    <div class="header" data-fill-width data-flex-center data-relative>
        <div style="flex: 1;padding: 0 0.5rem">
            <h2>H-UI</h2>
        </div>
        <div data-fill-height data-flex-column-center style="padding: 0.5rem">
            <label>
                <span>暗色</span>
                <input v-model="dark" type="checkbox" @click="changeTheme">
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
  box-shadow : 0 0 5px rgba(128, 128, 128, 0.3);
  height     : 50px;
}
</style>

<script lang="ts" setup>
import {ref} from "vue";

const dark = ref(false)

function changeTheme(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
        const root = document.documentElement
        let isDark = root.hasAttribute('dark')
        if (isDark)
            root.removeAttribute('dark')
        else
            root.setAttribute('dark', '')
    })

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 400,
                easing: "ease-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    })

}
</script>

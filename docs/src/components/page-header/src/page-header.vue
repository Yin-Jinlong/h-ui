<template>
    <div class="header" data-fill-width data-flex-center data-relative>
        <div style="flex: 1;padding: 0 0.5rem">
            <h2>H-UI</h2>
        </div>
        <div data-fill-height data-flex-column-center style="padding: 0.5rem">
            <label data-flex-center @click="changeTheme">
                <span>暗色</span>
                <h-switch v-model="dark"/>
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.3);
    height: 50px;
}
</style>

<script lang="ts" setup>
import {ref} from 'vue'

import {HSwitch, isDark, toggleDark, viewTransition} from '@yin-jinlong/h-ui'

const dark = ref(isDark())

function change() {
    toggleDark()
    dark.value = isDark()
}

function changeTheme(e: MouseEvent) {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    )

    viewTransition(change, null, () => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 400,
                easing: 'ease-out',
                pseudoElement: '::view-transition-new(root)',
            }
        )
    })
}
</script>

<template>
    <div class="header" data-fill-width data-flex-center data-relative>
        <div style="flex: 1;padding: 0 0.5rem">
            <h2><span @click="goHome">H-UI</span></h2>
        </div>
        <div data-fill-height data-flex-center style="padding: 0.5rem;box-sizing: border-box">
            <div style="width: 90px">
                <label data-flex-center @click="changeTheme">
                    <span>暗色</span>
                    <h-switch v-model="dark"/>
                </label>
            </div>
            <div title="github">
                <a href="https://github.com/yin-jinlong/h-ui" target="_blank">
                    <github class="github" data-transition-fast/>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@yin-jinlong/h-ui/style/src/tools/fns' as *;

.header {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.3);
    height: 50px;

    h2 {
        color: inherit;
        text-decoration: none;

        span {
            cursor: pointer;
        }
    }

    .github {
        cursor: pointer;
        fill: get-css(color, text-5);

        &:hover {
            fill: get-css(color, text-1);
        }

    }

}
</style>

<script lang="ts" setup>
import {ref} from 'vue'

import Github from '@icons/github.vue'

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

function goHome() {
    window.location.hash = ''
}

</script>

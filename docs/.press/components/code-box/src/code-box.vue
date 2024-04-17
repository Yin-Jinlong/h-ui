<template>
    <div>
        <div class="h-code" v-html="darkTheme?dark:light"/>
    </div>

</template>

<style lang="scss">

.h-code {
    border: grey solid 1px;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
    padding: 0.5em;

    pre, code {
        display: inline-block;
        font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
        min-width: 100%;
        width: max-content;
    }

}
</style>

<script lang="ts" setup>
import {darkTheme} from '../../../theme'

defineProps<{
    light: string
    dark: string
}>()

</script>

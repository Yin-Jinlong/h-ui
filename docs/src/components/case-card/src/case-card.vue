<template>
    <h-card class="case">
        <template #header>
            {{ title }}
        </template>
        <component :is="component"/>
        <template #footer>
            <div v-code="code"></div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.case {
  width : calc(100% - 5px);
}
</style>

<script lang="ts" setup>
import type {Component} from "vue"
import {HCard} from "@yin-jinlong/h-ui"

defineProps<{
    title: string
    component: Component
    code: string
}>()

</script>

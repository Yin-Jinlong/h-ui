<template>
    <h-card>
        <template #header>
            设置
        </template>
        <template #default>
            <h-check-box v-model="disabled">
                禁用
            </h-check-box>
        </template>
    </h-card>
    <h-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div v-for="size in sizes" :key="size" class="box">
                <h-switch v-model="on" :disabled="disabled" :size="size"/>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.box {
  margin : 1em 0;
}
</style>

<script lang="ts" setup>
import {HButtonSize, HSwitch, HCard, HCheckBox} from "@ui"
import {ref} from "vue";

const sizes: HButtonSize[] = ['small', 'normal', 'large', 'xlarge']
const on = ref(false)
const disabled = ref(false)
</script>

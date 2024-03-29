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
            颜色
        </template>
        <template #default>
            <div v-for="color in DefinedNamedColors" :key="color" style="display: inline-block;margin: 0.5em">
                <h-switch
                        v-model="on"
                        :disabled="disabled"
                        :on-color="color"/>
            </div>
            <div style="display: inline-block;margin: 0.5em">
                <h-switch
                        v-model="on"
                        :disabled="disabled"
                        :off-color="'danger'"
                        :on-color="'success'"/>
            </div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div v-for="size in sizes" :key="size" class="box">
                <h-switch
                        v-model="on"
                        :disabled="disabled"
                        :on-color="''"
                        :size="size"/>
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
import {NamedSize, HSwitch, HCard, HCheckBox, DefinedNamedColors} from "@ui"
import {ref} from "vue";

const sizes: NamedSize[] = ['small', 'normal', 'large', 'xlarge']
const on = ref(true)
const disabled = ref(false)
</script>

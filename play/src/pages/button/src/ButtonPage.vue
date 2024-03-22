<template>
    <h-card>
        <template #header>
            基础用法和颜色
        </template>
        <template #default>
            <div>
                <h-button type="">
                    没有样式
                </h-button>
            </div>
            <div>
                <label>
                    <span>边框</span>
                    <input v-model="border" type="checkbox">
                </label>
                <label>
                    <span>阴影</span>
                    <input v-model="shadow" type="checkbox">
                </label>
            </div>
            <div v-for="(type,ti) in types" class="grid">
                <h-button
                        v-for="(color,i) in colors"
                        :key="type"
                        :border="border"
                        :color="color"
                        :shadow="shadow"
                        :type="type">
                    {{ i === 0 ? typeTexts[ti] : colorTexts[i] }}
                </h-button>
            </div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div>
                <label>
                    <span>边框</span>
                    <input v-model="border" type="checkbox">
                </label>
                <label>
                    <span>阴影</span>
                    <input v-model="shadow" type="checkbox">
                </label>
            </div>
            <div v-for="type in types">
                <h-button v-for="size in sizes"
                            :key="size"
                            :border="border"
                            :shadow="shadow"
                            :size="size"
                            :type="type">按钮
                </h-button>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
div + div {
  margin-top : 1em;
}

.grid {
  display               : grid;
  grid-template-columns : repeat(7, 1fr);
}

</style>

<script lang="ts" setup>
import {HButton, HButtonSize, HButtonType, HCard} from '@ui'
import {DefinedNamedColor} from "h-ui/types"
import {ref} from "vue"

const sizes: HButtonSize[] = ['small', 'default', 'large', 'xlarge']
const types: HButtonType[] = ['primary', 'plain', 'text']
const typeTexts: string[] = ['主要', '普通', '文字']
const colors: (string | DefinedNamedColor)[] = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize', '#39e']
const colorTexts: string[] = ['主要', '成功', '警告', '危险', '信息', '强调', '自定义']

const border = ref(false)
const shadow = ref(false)

</script>

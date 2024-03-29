<template>
    <h-card>
        <template #header>
            设置
        </template>
        <template #default>
            <h-check-box v-model="disabled">
                禁用
            </h-check-box>
            <h-check-box v-model="border">
                边框
            </h-check-box>
            <label>
                <span>阴影</span>
                <select id="shadow" v-model="shadow">
                    <option>off</option>
                    <option>always</option>
                    <option>hover</option>
                </select>
            </label>
        </template>
    </h-card>
    <h-card>
        <template #header>
            基础用法和颜色
        </template>
        <template #default>
            <div class="box">
                <h-button :disabled="disabled" type="">
                    没有样式
                </h-button>
            </div>
            <div v-for="(type,ti) in types" class="grid box">
                <h-button
                        v-for="(color,i) in colors"
                        :key="type"
                        :border="border"
                        :color="color"
                        :disabled="disabled"
                        :shadow="convertShadow()"
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
            <div v-for="type in types" class="box">
                <h-button v-for="size in NamedSizes"
                          :key="size"
                          :border="border"
                          :disabled="disabled"
                          :shadow="convertShadow()"
                          :size="size"
                          :type="type">按钮
                </h-button>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>
.box + .box {
  margin-top : 1em;
}

.grid {
  display               : grid;
  grid-template-columns : repeat(7, 1fr);
}

</style>

<script lang="ts" setup>
import {HButton, HButtonShadowType,NamedSizes, HButtonType, HCard, HCheckBox} from '@ui'
import {DefinedNamedColor} from "h-ui/types"
import {ref} from "vue"

const types: HButtonType[] = ['primary', 'plain', 'text']
const typeTexts: string[] = ['主要', '普通', '文字']
const colors: (string | DefinedNamedColor)[] = ['primary', 'success', 'warning', 'danger', 'info', 'emphasize', '#39e']
const colorTexts: string[] = ['主要', '成功', '警告', '危险', '信息', '强调', '自定义']

const disabled = ref(false)
const border = ref(false)
const shadow = ref<string>('off')

function convertShadow(): boolean | HButtonShadowType {
    if (shadow.value === 'off') {
        return false
    }
    return shadow.value as HButtonShadowType
}

</script>

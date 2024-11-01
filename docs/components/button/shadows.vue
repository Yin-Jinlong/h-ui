<template>
    <div>
        <h-check-box v-model="disabled">禁用</h-check-box>
        <h-check-box v-model="border">边框</h-check-box>
        <label>
            阴影
            <select v-model="shadowType">
                <option>off</option>
                <option>hover</option>
                <option>always</option>
            </select>
        </label>
    </div>
    <br>
    <div v-for="t in types">
        <div>
            <h-button
                v-for="(c,i) in DefinedNamedColors"
                v-disabled="disabled"
                :border="border"
                :color="c"
                :shadow="getShadowType()"
                :type="t">
                {{ colorTexts[i] }}
            </h-button>
            <h-button
                v-disabled="disabled"
                :border="border"
                :disabled="disabled"
                :shadow="getShadowType()"
                :type="t"
                color="#39e">
                自定义
            </h-button>
        </div>
        <br>
    </div>
</template>

<script lang="ts" setup>
import {
    HButtonType,
    HButtonShadowType,
    DefinedNamedColors,
    HButton,
    HCheckBox,
    vDisabled
} from '@yin-jinlong/h-ui'
import {ref} from 'vue'

const types: HButtonType[] = ['primary', 'plain', 'link', 'text']
const colorTexts = ['主要', '成功', '警告', '危险', '信息', '强调']

const border = ref(false)
const disabled = ref(false)
const shadowType = ref<'off' | HButtonShadowType>('off')

function getShadowType() {
    if (shadowType.value === 'off')
        return false
    return shadowType.value
}

</script>

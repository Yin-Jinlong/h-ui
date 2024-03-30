<template>
    <h-card>
        <template #header>
            设置
        </template>
        <template #default>
            <h-check-box v-model="disabled">
                禁用
            </h-check-box>
            <br>
            <label>
                类型
                <select v-model="type">
                    <option v-for="t in types">{{ t }}</option>
                </select>
            </label>
        </template>
    </h-card>
    <div data-flex style="flex-wrap: wrap">
        <h-card>
            <template #header>
                颜色
            </template>
            <template #default>
                <div v-for="color in DefinedNamedColors" class="box">
                    <h-input v-model="texts" :color="color" :disabled="disabled" :placeholder="color" :type="type"/>
                </div>
                <div class="box">
                    <h-input v-model="texts" :color="'#39e'" :disabled="disabled" :placeholder="'自定义'" :type="type"/>
                </div>
                <div class="box">
                    <h-input v-model="texts"
                             :disabled="disabled"
                             :placeholder="'自定义+文字颜色'"
                             :type="type"
                             color="#39e"
                             text-color="primary"/>
                </div>
            </template>
        </h-card>
        <h-card>
            <template #header>
                尺寸
            </template>
            <template #default>
                <div v-for="size in NamedSizes" class="box">
                    <h-input v-model="texts" :disabled="disabled" :placeholder="size" :size="size" :type="type"/>
                </div>
            </template>
        </h-card>
    </div>
</template>

<style lang="scss" scoped>
.box {
  margin : 1em 0;
}
</style>

<script lang="ts" setup>
import {nextTick, ref, watch} from "vue"
import {HInput, HCard, HCheckBox, NamedSizes, DefinedNamedColors} from '@ui'

const types = [
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'tel',
    'text',
    'time',
    'url',
    'week']

const disabled = ref(false)
const type = ref('text')
const texts = ref('')

watch(type, (t) => {
    nextTick(() => {
        texts.value = t === 'color' ? '#000000' : ''
    })
})

</script>

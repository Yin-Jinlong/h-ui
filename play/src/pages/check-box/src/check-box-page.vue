<template>
    <h-card>
        <template #header>
            设置
        </template>
        <template #default>
            <label>
                <span>禁用</span>
                <input v-model="disabled" type="checkbox">
            </label>
        </template>
    </h-card>
    <h-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div data-flex-center style="justify-content: space-evenly">
                <div v-for="s in sizes">
                    <h-check-box v-model="checked"
                                 :disabled="disabled"
                                 :size="s"/>
                </div>
            </div>
        </template>
    </h-card>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {ref} from "vue"
import {HCheckBox, HCard} from '@ui'

const sizes = ['small', 'normal', 'large', 'xlarge']

const checked = ref(false)
const disabled = ref(false)
</script>

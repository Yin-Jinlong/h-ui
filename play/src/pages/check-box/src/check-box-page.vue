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
    <h-card style="width: 300px">
        <template #header>
            颜色
        </template>
        <template #default>
            <div data-flex-center style="justify-content: space-evenly">
                <div v-for="c in DefinedNamedColors">
                    <h-check-box v-model="checked"
                                 :disabled="disabled"
                                 :on-color="c"/>
                </div>
                <div>
                    <h-check-box v-model="checked"
                                 :disabled="disabled"
                                 :on-color="'#39e'"/>
                </div>
                <div>
                    <h-check-box v-model="checked"
                                 :disabled="disabled"
                                 :off-color="'danger'"
                                 :on-color="'success'"/>
                </div>
            </div>
        </template>
    </h-card>
    <h-card>
        <template #header>
            尺寸
        </template>
        <template #default>
            <div data-flex-center style="justify-content: space-evenly">
                <div v-for="s in NamedSizes">
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
import {HCheckBox, HCard, DefinedNamedColors, NamedSizes} from '@ui'

const checked = ref(false)
const disabled = ref(false)
</script>

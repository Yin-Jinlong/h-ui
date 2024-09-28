<template>
    <label class="box">
        默认
        <h-switch action-text/>
    </label>
    <label class="box">
        自定义
        <h-switch>
            <template #action="v">
                <span>{{ v.value ? 'o' : 'x' }}</span>
            </template>
        </h-switch>
    </label>
</template>

<style lang="scss" scoped>
.box {
    align-items: center;
    display: inline-flex;
}
</style>

<script lang="ts" setup>
import {HSwitch} from '@yin-jinlong/h-ui'

</script>

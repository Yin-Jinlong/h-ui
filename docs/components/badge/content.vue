<template>
    <div class="box">
        <h-button type="plain">
            默认数字
            <h-badge :value="100"/>
        </h-button>
        <h-button type="plain">
            自定义字符串
            <h-badge value="new"/>
        </h-button>
        <h-button type="plain">
            点
            <h-badge dot/>
        </h-button>
    </div>
</template>

<style lang="scss" scoped>
.box {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;

    & > * {
        margin: 0.5rem;
    }

}
</style>

<script lang="ts" setup>
import {HBadge, HButton} from '@yin-jinlong/h-ui'
</script>

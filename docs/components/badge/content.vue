<template>
    <div class="box">
        <h-badge :value="100">
            <h-button type="plain">
                默认数字
            </h-button>
        </h-badge>
        <h-badge value="new">
            <h-button type="plain">
                自定义字符串
            </h-button>
        </h-badge>
    </div>

</template>

<style scoped lang="scss">
.box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    & > * {
        margin: 0.5rem;
    }

}
</style>

<script setup lang="ts">
import {HBadge, HButton} from '@yin-jinlong/h-ui'
</script>

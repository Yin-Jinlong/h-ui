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
        <h-badge dot>
            <h-button type="plain">
                点
            </h-button>
        </h-badge>
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

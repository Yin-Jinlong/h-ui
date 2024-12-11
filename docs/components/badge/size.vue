<template>
    <div class="box">
        <h-button type="plain">
            默认
            <h-badge :value="100"/>
        </h-button>
        <h-button type="plain">
            小
            <h-badge :value="100" style="font-size: 6px"/>
        </h-button>
        <h-button type="plain">
            大
            <h-badge :value="1000" style="font-size: 16px"/>
        </h-button>
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

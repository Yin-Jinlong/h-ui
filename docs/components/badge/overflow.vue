<template>
    <div class="box">
        <h-button type="plain">
            默认
            <h-badge :value="100"/>
        </h-button>
        <h-button type="plain">
            圆点2位
            <h-badge :value="100" overflow="dot"/>
        </h-button>
        <h-button type="plain">
            圆点3位
            <h-badge :value="1000" overflow="dot" :max="999"/>
        </h-button>
    </div>

</template>

<style scoped lang="scss">
.box {
    display: flex;
    flex-wrap: wrap;

    & > * {
        margin: 0.5rem;
    }

}
</style>

<script setup lang="ts">
import {HBadge, HButton} from '@yin-jinlong/h-ui'
</script>

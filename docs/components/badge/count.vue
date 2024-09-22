<template>
    <div class="box">
        <h-badge>
            <h-button type="plain">
                默认
            </h-button>
        </h-badge>
        <h-badge :value="10">
            <h-button type="plain">
                10
            </h-button>
        </h-badge>
        <h-badge :value="100">
            <h-button type="plain">
                100
            </h-button>
        </h-badge>
        <h-badge :value="100" :max="9">
            <h-button type="plain">
                自定义上限
            </h-button>
        </h-badge>
        <h-badge :value="0" :min="0">
            <h-button type="plain">
                自定义下限
            </h-button>
        </h-badge>
        <h-badge :value="0">
            <h-button type="plain">
                0
            </h-button>
        </h-badge>
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

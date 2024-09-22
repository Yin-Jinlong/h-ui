<template>
    <div class="box">
        <h-badge :value="100">
            <h-button type="plain">
                默认
            </h-button>
        </h-badge>
        <h-badge :value="100" style="font-size: 12px">
            <h-button type="plain">
                小
            </h-button>
        </h-badge>
        <h-badge :value="1000" style="font-size: 30px">
            <h-button type="plain">
                大
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

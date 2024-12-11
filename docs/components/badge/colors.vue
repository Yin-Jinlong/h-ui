<template>
    <div class="box">
        <h-button v-for="c in DefinedNamedColors" type="plain">
            {{ c }}
            <h-badge :color="c"/>
        </h-button>
        <h-button type="plain">
            自定义
            <h-badge color="#39e"/>
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
import {DefinedNamedColors, HBadge, HButton} from '@yin-jinlong/h-ui'
</script>

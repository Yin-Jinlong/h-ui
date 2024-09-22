<template>
    <div class="box">
        <h-badge color="primary">
            <h-button type="plain">
                primary
            </h-button>
        </h-badge>
        <h-badge color="success">
            <h-button type="plain">
                success
            </h-button>
        </h-badge>
        <h-badge color="warning">
            <h-button type="plain">
                warning
            </h-button>
        </h-badge>
        <h-badge color="danger">
            <h-button type="plain">
                danger
            </h-button>
        </h-badge>
        <h-badge color="info">
            <h-button type="plain">
                info
            </h-button>
        </h-badge>
        <h-badge color="emphasize">
            <h-button type="plain">
                emphasize
            </h-button>
        </h-badge>
        <h-badge color="#39e">
            <h-button type="plain">
                自定义
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

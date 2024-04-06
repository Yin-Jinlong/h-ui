<template>
    <h-card v-loading data-relative>
        <template #header>
            标题
        </template>
        <template #default>
            内容
            <br>
            内容
        </template>
    </h-card>
</template>

<script lang="ts" setup>
import {HCard, vLoading} from "@yin-jinlong/h-ui"
</script>

<template>
    <case-card :code="fullCode" :component="Full" title="全部"/>
    <case-card :code="contentCode" :component="Content" title="只有内容"/>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import {CaseCard} from "@components"

import Full from "./full.vue"
import Content from "./content.vue"

import fullCode from "./full.vue?raw"
import contentCode from "./content.vue?raw"

</script>

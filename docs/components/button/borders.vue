<template>
    <div v-for="t in types">
        <div>
            <h-button v-for="(c,i) in DefinedNamedColors" :color="c" :type="t" border>{{ colorTexts[i] }}</h-button>
            <h-button :type="t" border color="#39e">自定义</h-button>
        </div>
        <br>
    </div>
</template>

<script lang="ts" setup>
import {
    HButtonType,
    DefinedNamedColors,
    HButton
} from '@yin-jinlong/h-ui'

const types: HButtonType[] = ['primary', 'plain', 'text']
const colorTexts = ['主要', '成功', '警告', '危险', '信息', '强调']

</script>

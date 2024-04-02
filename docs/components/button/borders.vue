<template>
    <div v-for="t in types">
        <div>
            <h-button v-for="(c,i) in DefinedNamedColors" border :color="c" :type="t">{{ colorTexts[i] }}</h-button>
            <h-button border color="#39e" :type="t">自定义</h-button>
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
const colorTexts = ['主要', '成功', '警告',  '危险', '信息','强调']

</script>

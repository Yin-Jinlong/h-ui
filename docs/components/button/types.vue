<template>
    <div>
        <h-button>None</h-button>
    </div>
    <br>
    <div v-for="(t,i) in types">
        <div>
            <h-button v-for="c in DefinedNamedColors" :color="c" :type="t">{{typeTexts[i]}}</h-button>
            <h-button :type="t" color="#39e">{{typeTexts[i]}}</h-button>
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
const typeTexts: HButtonType[] = ['primary', 'plain', 'text']
</script>

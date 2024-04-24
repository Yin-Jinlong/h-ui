<template>
    <div>
        <h-button>None</h-button>
    </div>
    <br>
    <div v-for="t in types">
        <div>
            <h-button v-for="(c,i) in DefinedNamedColors"
                      :color="c" :type="t">
                {{ i === 0 ? t : DefinedNamedColors[i] }}
            </h-button>
            <h-button :type="t" color="#39e">{{ t }}</h-button>
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

const types: HButtonType[] = ['primary', 'plain', 'link', 'text']
</script>

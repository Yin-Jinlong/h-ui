<template>
    <div v-for="t in ['primary','plain','text'] as HButtonType[]">
        <div>
            <h-button v-for="s in ['small','normal','large','xlarge'] as NamedSize[]"
                      :size="s"
                      :type="t">
                {{ s[0] }}
            </h-button>
        </div>
        <br>
    </div>
</template>

<script lang="ts" setup>
import {HButtonType, HButton, NamedSize} from '@yin-jinlong/h-ui'
</script>

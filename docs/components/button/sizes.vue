<template>
    <div v-for="t in ['primary','plain','text'] as HButtonType[]">
        <div>
            <h-button :type="t" size="small">small</h-button>
            <h-button :type="t" size="normal">normal</h-button>
            <h-button :type="t" size="large">large</h-button>
            <h-button :type="t" size="xlarge">xlarge</h-button>
        </div>
        <br>
    </div>
</template>

<script lang="ts" setup>
import {HButtonType, HButton} from '@yin-jinlong/h-ui'
</script>

<template>
    <div data-fill-size data-flex-column>
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
import {isCompatibility} from '@yin-jinlong/h-ui'
import {onMounted} from 'vue'

onMounted(() => {
    console.log('compatibility', isCompatibility())
})

</script>

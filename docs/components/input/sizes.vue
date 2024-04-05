<template>
    <div>
        <div class="box">
            <h-input v-model="value" placeholder="small" size="small"/>
        </div>
        <div class="box">
            <h-input v-model="value" placeholder="normal" size="normal"/>
        </div>
        <div class="box">
            <h-input v-model="value" placeholder="large" size="large"/>
        </div>
        <div class="box">
            <h-input v-model="value" placeholder="xlarge" size="xlarge"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
  margin : 0.5em 0;
}
</style>

<script lang="ts" setup>
import {ref} from "vue"
import {HInput} from '@yin-jinlong/h-ui'

const value = ref('')
</script>

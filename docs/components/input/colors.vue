<template>
    <h-check-box v-model="disabled">禁用</h-check-box>
    <div>
        <div v-for="c in DefinedNamedColors" class="box">
            <h-input v-model="value"
                     :color="c"
                     v-disabled="disabled"
                     :placeholder="c"/>
        </div>
        <div class="box">
            <h-input v-model="value"
                     v-disabled="disabled"
                     color="#39e"
                     placeholder="自定义"/>
        </div>
        <div class="box">
            <h-input v-model="value"
                     v-disabled="disabled"
                     color="#39e"
                     placeholder="自定义+文字颜色"
                     text-color="primary"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    margin: 0.5em 0;
}
</style>

<script lang="ts" setup>
import {ref} from 'vue'
import {DefinedNamedColors, HCheckBox, HInput,vDisabled} from '@yin-jinlong/h-ui'

const disabled = ref(false)
const value = ref('')
</script>

<template>
    <h-check-box v-model="border">边框</h-check-box>
    <div>
        <div v-for="c in DefinedNamedColors" class="box">
            <h-input v-model="value"
                     :border="border"
                     :color="c"
                     :placeholder="c"/>
        </div>
        <div class="box">
            <h-input v-model="value"
                     :border="border"
                     color="#39e"
                     placeholder="自定义"/>
        </div>
        <div class="box">
            <h-input v-model="value"
                     :border="border"
                     color="#39e"
                     placeholder="自定义+文字颜色"
                     text-color="primary"/>
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
import {
    DefinedNamedColors,
    HInput, HCheckBox
} from '@yin-jinlong/h-ui'

const border = ref(true)
const value = ref('')

</script>

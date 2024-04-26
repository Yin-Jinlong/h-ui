<template>
    <div ref="box" class="h-code">
        <div class="lang">{{ lang }}</div>
        <div v-if="mouseIn" class="tools" data-flex-center>
            <h-button class="copy" @click="copy" size="small" type="text">
                复制{{ copySuccess ? '成功！' : '' }}
            </h-button>
        </div>
        <div ref="codeEle" v-html="code"/>
    </div>
</template>

<style lang="scss" scoped>

.h-code {
    position: relative;
}

.tools {
    background-color: rgb(128, 128, 128, 0.5);
    border-radius: 5px;
    position: absolute;
    right: 0;
    top: 0;
}

.lang {
    position: absolute;
    right: 0.2em;
    top: 0;
    font-size: 14px;
    opacity: 0.5;
}

</style>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'

import {HButton} from '@yin-jinlong/h-ui'

const props = defineProps<{
    code: string
}>()

const mouseIn = ref(false)
const box = ref<HTMLDivElement>()
const codeEle = ref<HTMLDivElement>()
const lang = ref('')
const copySuccess = ref(false)

function updateLang(code: string) {
    let i = code.indexOf('<code')
    let langAttr = code.substring(i + 22, i + 46)
    i = langAttr.indexOf('">')
    lang.value = langAttr.substring(0, i)
}

function copy() {
    navigator.clipboard.writeText(codeEle.value!.innerText!).then(() => {
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    })
}

onMounted(() => {
    updateLang(props.code)

    function out() {
        mouseIn.value = false
    }

    box.value!.addEventListener('mouseenter', e => {
        mouseIn.value = true
    })
    box.value!.addEventListener('mouseleave', out)
    box.value!.addEventListener('mouseleave', out)
    window.addEventListener('blur', out)

})

watch(() => props.code, updateLang)

</script>

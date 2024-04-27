<template>
    <div ref="box" class="h-code">
        <div class="lang">{{ lang }}</div>
        <transition @enter="enter" @leave="leave">
            <div v-if="mouseIn" class="tools" data-flex-center>
                <h-button class="copy" size="small" type="text" @click="copy">
                    复制{{ copySuccess ? '成功！' : '' }}
                </h-button>
            </div>
        </transition>
        <div ref="codeEle" style="overflow-x: auto" v-html="code"/>
    </div>
</template>

<style lang="scss" scoped>

.h-code {
    position: relative;
}

.tools {
    background-color: rgba(230, 230, 230, 0.8);
    border-radius: 5px;
    position: absolute;
    right: 0;
    top: 0;
}

.lang {
    font-size: 14px;
    opacity: 0.5;
    position: absolute;
    right: 0.2em;
    top: 0;
}

html[dark] {
    .tools {
        background-color: rgba(20, 20, 20, 0.8);
    }
}

</style>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'

import {HButton} from '@yin-jinlong/h-ui'

import {enter,leave} from './transition'

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

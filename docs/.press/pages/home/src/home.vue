<template>
    <page-header/>
    <div v-if="route.path==='/'" data-fill-size
         data-flex-column
         style="overflow: hidden;align-items: center;padding-top: 50px">
        <div data-fill-width data-flex-column style="flex:1;max-width: 1000px">
            <div class="main-head">
                <h1 class="home-title">H UI Docs</h1>
                <p>氢UI文档</p>
            </div>
            <div class="main-btn">
                <h-button border type="primary" @click="router.push('quick-start')">快速上手</h-button>
                <h-button border type="plain" @click="router.push('button')">组件</h-button>
            </div>
            <div v-loading="chartComponent===null" data-flex-column-center data-relative
                 style="width: 100%;height: 500px">
                <h-button v-if="!chartComponent" type="plain" @click="loadChart">加载统计图表</h-button>
                <component :is="chartComponent" v-else/>
            </div>
        </div>
    </div>
    <div v-else class="content-box" data-fill-size data-flex>
        <side-bar :items="pages" :now="route.name?.toString()"/>
        <div v-loading="loading"
             class="content"
             data-flex-column
             data-relative
             h-loading-text="加载中..."
             style="flex: 1;">
            <div ref="appEle" md>
                <router-view v-slot="{ Component,route  }">
                    <transition appear @after-appear="startAnim" @after-enter="startAnim">
                        <div :key="route.path">
                            <component :is="Component"/>
                        </div>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.content-box {
    height: 100%;
    overflow: hidden;
}

.content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 5px;
    padding-top: 50px;
}

.main-head {
    padding-top: 2em;
}

.main-btn {
    margin: 1em 0;
}

h1.home-title {
    background: -webkit-linear-gradient(120deg, #FEBE34 30%, #2EA1FF);;
    -webkit-background-clip: text;
    background-clip: text;
    display: inline-block;
    font-size: 48px;
    -webkit-text-fill-color: transparent;
    width: max-content;

    & + p {
        font-size: 30px;
    }

}

</style>

<script lang="ts" setup>
import type {Component} from 'vue'
import {ref, shallowRef} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {HButton, vLoading} from '@yin-jinlong/h-ui'

import {PageHeader, SideBar} from '@components'

import pages from '../../../pages'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const appEle = ref<HTMLElement>()
const chartComponent = shallowRef<Component | null | undefined>()

async function startAnim() {
    ;(Array.from(appEle.value?.firstElementChild?.children ?? []) as HTMLElement[]).forEach((c, i) => {
        (c.style.opacity = '0')
        c.animate({
            opacity: [0, 1],
            translate: ['100px 0', '0 0']
        }, {
            duration: 300,
            fill: 'forwards',
            delay: 30 * i
        })
    })
}


async function loadChart() {
    chartComponent.value = null
    import('@components/statistics-chart').then((module) => {
        setTimeout(() => {
            chartComponent.value = module['StatisticsChart']
        }, 300)
    })
}

</script>

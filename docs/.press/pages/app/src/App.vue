<template>
    <div data-fill-size data-flex-column>
        <page-header/>
        <div v-if="app" data-flex style="flex: 1;overflow: hidden">
            <side-bar :items="items" :now="nowPage"/>
            <div v-loading="loading"
                 class="content"
                 data-flex-column
                 data-relative
                 h-loading-text="加载中..."
                 style="flex: 1;">
                <div ref="appEle" md>
                    <component :is="app"/>
                </div>
            </div>
        </div>
        <h3 v-if="!app&&!isHome()" v-loading="loading" h-loading-text="加载中...">404</h3>
        <div v-if="isHome()" data-flex-column style="flex: 1;overflow: hidden;align-items: center">
            <div data-fill-width data-flex-column style="flex:1;max-width: 1000px">
                <div class="main-head">
                    <h1 class="home-title">H UI Docs</h1>
                    <p>氢UI文档</p>
                </div>
                <div class="main-btn">
                    <h-button border type="primary" @click="href('quick-start')">快速上手</h-button>
                    <h-button border type="plain" @click="href('button')">组件</h-button>
                </div>
                <div data-relative v-loading="chartComponent===null" data-flex-column-center
                     style="width: 100%;height: 500px">
                    <h-button @click="loadChart" v-if="!chartComponent" type="plain">加载统计图表</h-button>
                    <component v-else :is="chartComponent"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 5px;
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
import {Page, PageGroup} from '@types'
import type {Component} from 'vue'
import {nextTick, onMounted, ref, shallowRef} from 'vue'
import {HButton, vLoading} from '@yin-jinlong/h-ui'

import {PageHeader, SideBar} from '@components'

// @ts-ignore
import components from 'indexes~'

const items = [
    {
        label: '开始',
        items: [
            {
                name: '快速上手',
                path: '/quick-start',
                component: () => import('quick-start.vue?md')
            }
        ]
    },
    {
        label: '组件',
        items: components
    }
] as PageGroup[]

const app = shallowRef<Component | null>()
const loading = ref(false)
const nowPage = ref('')
const appEle = ref<HTMLElement>()

const chartComponent = shallowRef<Component | null | undefined>()
const pathMap: Map<string, Page> = new Map()

function isHome() {
    let {hash} = window.location
    return hash === '' || hash === '#/'
}


function href(link: string) {
    window.location.hash = '/' + link
}

function startAnim() {
    (Array.from(appEle.value?.children ?? []) as HTMLElement[]).forEach((c, i) => {
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

async function go(path: string) {
    let c = pathMap.get(path)
    if (c) {
        loading.value = true
        let page = (await c.component()).default
        setTimeout(() => {
            nowPage.value = c!.name
            app.value = page
            loading.value = false
            nextTick(startAnim)
        }, 300)
    } else {
        app.value = null
        loading.value = false
    }
}

async function loadChart() {
    chartComponent.value = null
    import('@components/statistics-chart').then((module) => {
        setTimeout(() => {
            chartComponent.value = module['StatisticsChart']
        }, 300)
    })
}

onMounted(() => {
    items.forEach(pg => pg.items.forEach(c => pathMap.set(c.path, c)))
    go(window.location.hash.substring(1))
    window.onhashchange = async (e) => {
        e.preventDefault()
        await go(window.location.hash.substring(1))
        console.log(window.location)
    }
})

</script>

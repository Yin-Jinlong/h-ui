<template>
    <div data-fill-size data-flex-column>
        <page-header/>
        <div v-if="app" data-flex style="flex: 1;overflow: hidden">
            <side-bar :items="components" :now="nowPage"/>
            <div v-loading="loading"
                 class="content"
                 data-flex-column
                 data-relative
                 h-loading-text="加载中..."
                 style="flex: 1;">
                <div md>
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
                    <h-button border type="primary" @click="href('button')">组件</h-button>
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
import type {Component} from 'vue'
import {onMounted, shallowRef} from 'vue'
import {HButton, vLoading} from '@yin-jinlong/h-ui'

import {PageHeader, SideBar} from '@components'

// @ts-ignore
import components from 'indexes~'

const app = shallowRef<Component | null>()
const loading = shallowRef(false)
const nowPage = shallowRef('')

const chartComponent = shallowRef<Component | null | undefined>()

function isHome() {
    let {hash} = window.location
    return hash === '' || hash === '#/'
}


function href(link: string) {
    window.location.hash = '/' + link
}

async function go(path: string) {
    for (const component of components) {
        if (component.path === path) {
            loading.value = true
            let page = (await component.component()).default
            setTimeout(() => {
                nowPage.value = component.name
                app.value = page
                loading.value = false
            }, 300)
            return
        }
    }
    app.value = null
    loading.value = false
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
    go(window.location.hash.substring(1))
    window.onhashchange = async (e) => {
        e.preventDefault()
        await go(window.location.hash.substring(1))
        console.log(window.location)
    }
})

</script>

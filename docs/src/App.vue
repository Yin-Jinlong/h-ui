<template>
    <div data-fill-size data-flex-column>
        <page-header/>
        <div v-if="app" data-flex style="flex: 1;overflow: hidden">
            <side-bar :items="components"/>
            <div class="content">
                <component :is="app"/>
            </div>
        </div>
        <h3 v-if="!app&&!isHome()">404</h3>
        <div v-if="isHome()" data-flex-column style="flex: 1;overflow: hidden;align-items: center">
            <div data-fill-width data-flex-column style="flex:1;max-width: 1000px">
                <div class="main-head">
                    <h1>H UI Docs</h1>
                    <p>氢UI文档</p>
                </div>
                <div class="main-btn">
                    <h-button @click="href('button')" border type="primary">组件</h-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
  flex       : 1;
  overflow-x : hidden;
  overflow-y : auto;
}

.main-head {
  padding-top : 2em;
}

.main-btn {
  margin : 1em 0;
}

h1 {
  background              : -webkit-linear-gradient(120deg, #FEBE34 30%, #2EA1FF);;
  -webkit-background-clip : text;
  background-clip         : text;
  display                 : inline-block;
  font-size               : 48px;
  -webkit-text-fill-color : transparent;
  width                   : max-content;

  & + p {
    font-size : 30px;
  }

}

</style>

<script lang="ts" setup>

import type {Component} from "vue"
import {onMounted, shallowRef} from "vue"
import {HButton} from "@yin-jinlong/h-ui"

import {PageHeader, SideBar} from "@components"

import components from '../components-indexes'

const app = shallowRef<Component | null>()

function isHome() {
    return window.location.hash === ''
}


function href(link: string) {
    window.location.hash = '/' + link
}

async function go(path: string) {
    for (const component of components) {
        if (component.path === path) {
            app.value = (await component.component()).default
            return
        }
    }
    app.value = null
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

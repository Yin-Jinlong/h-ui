<template>
    <div data-fill-size data-flex-column>
        <page-header/>
        <div data-flex style="flex: 1;overflow: hidden">
            <side-bar :items="components"/>
            <div class="content">
                <component :is="app" v-if="app"/>
                <h2 v-else>404 NOT FOUND</h2>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
  flex       : 1;
  overflow-y : auto;
  overflow-x : hidden;
}
</style>

<script lang="ts" setup>

import type {Component} from "vue"
import {onMounted, shallowRef} from "vue"

import {PageHeader, SideBar} from "@components"

import components from '../components-indexes'

const app = shallowRef<Component | null>()


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

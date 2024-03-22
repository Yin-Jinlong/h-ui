<template>
    <ul>
        <li v-for="page in pages" :key="page.name">
            <router-link :to="page.path">
                <h-button>
                    {{ page.name }}
                </h-button>
            </router-link>
        </li>
    </ul>
</template>

<style scoped lang="scss">
li {
  display : inline-block;
  margin  : 0.5em 5px;

  &::marker {
    content : '';
    display : none;
  }
}
</style>

<script setup lang="ts">

import {HButton} from "@ui"

interface Page {
    name: string
    path: string
}

const pages: Page[] = [
    {
        name: 'Button',
        path: '/button'
    },
    {
        name: 'Card',
        path: '/card'
    },
]


</script>

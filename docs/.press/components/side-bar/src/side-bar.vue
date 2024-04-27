<template>
    <div class="side-bar" data-fill-height>
        <div v-for="pg in items">
            <label>{{ pg.label }}</label>
            <div v-for="i in pg.items">
                <h-button :type="now===i.name?'primary':'text'" data-fill-width @click="router.push(i.path)">
                    {{ i.name }}
                </h-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.side-bar {
    box-shadow: rgb(128, 128, 128, 0.4) 0 5px 5px;
    width: 300px;

    @media screen and (max-width: 1000px) {
        width: 200px;
    }

    @media screen and (max-width: 800px) {
        width: 100px;
    }

}

</style>

<script lang="ts" setup>
import {HButton} from '@yin-jinlong/h-ui'
import {useRouter} from 'vue-router'

import {SidebarProps} from './props'

const router = useRouter()

defineProps<SidebarProps>()

</script>

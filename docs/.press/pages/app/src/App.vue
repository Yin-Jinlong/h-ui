<template>
    <div data-fill-size>
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
import {Vec2} from '@pages/app/src/vec2'
import {isCompatibility, HMessage} from '@yin-jinlong/h-ui'
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {Word, Body} from './word'

const router = useRouter()

const word = new Word()

function random(d: number = 200, min: number = 600) {
    return (Math.random() * d + min)
}

function add(x: number, y: number) {
    for (let i = 0; i < 5 + Math.round(Math.random() * 20); i++) {
        let body = new Body()
        body.pos.set(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5)
        let v = new Vec2(0, random())
        body.a.set(0, 1200)
        body.v.set(v.x, v.y)
        body.v.rotate(Math.random() * 360)
        body.v.x = body.v.x / 1.2
        word.add(body)
    }
}

onMounted(() => {
    console.log('compatibility', isCompatibility())
    addEventListener('click', (e) => {
        if (router.currentRoute.value.path !== '/')
            return
        add(e.x, e.y)
    })
    let lastTime = Date.now()
    requestAnimationFrame(function step() {
        let now = Date.now()
        let dt = now - lastTime
        word.step(dt / 1000)
        lastTime = now
        requestAnimationFrame(step)
    })
    setTimeout(() => {
        HMessage.primary('欢迎！')
    }, 500)
})

</script>

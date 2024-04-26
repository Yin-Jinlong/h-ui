<template>
    <div data-fill-size>
        <label data-flex-center style="justify-content: start">
            只显示近100次
            <h-check-box v-model="show100"/>
        </label>
        <div ref="chartEle" class="chart"/>
    </div>
</template>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts" setup>
import {isDark, HCheckBox} from '@yin-jinlong/h-ui'
import type {EChartsOption} from 'echarts'
import * as echart from 'echarts/core'
import {
    GraphicComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
} from 'echarts/components'
import {LineChart} from 'echarts/charts'
import {SVGRenderer} from 'echarts/renderers'
import {onMounted, ref, watch} from 'vue'

import {lightTheme, darkTheme} from './theme'

echart.use([
    SVGRenderer,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    TitleComponent,
    TooltipComponent,
])

const show100 = ref(false)
const chartEle = ref<HTMLDivElement>()


let data: any[] | undefined
let c: echart.ECharts
let x: number[]
let hashes: string[]
let files: number[]
let lines: number[]
let codes: number[]

async function getData() {
    x = []
    hashes = []
    files = []
    lines = []
    codes = []

    async function convertData() {
        let si = show100.value ? (data?.length ?? 0) - 101 : -1
        data?.forEach((line, i) => {
            if (i >= si && line.length > 1) {
                let [hash, file, blank, comment, code] = line
                x.push(i + 1)
                hashes.push(hash)
                files.push(parseInt(file))
                lines.push(parseInt(blank) + parseInt(comment) + parseInt(code))
                codes.push(parseInt(code))
            }
        })
    }

    return data ? convertData() : fetch('/cloc.csv').then(res => res.text()).then(async (text) => {
        let [header, ..._data] = text.split('\n').map((line) => line.split(','))
        data = _data
        await convertData()
    })
}


function initChart() {
    if (c)
        c.dispose()
    c = echart.init(chartEle.value, isDark() ? darkTheme : lightTheme)
    c!.setOption({
        series: [
            {
                data: files,
                type: 'line',
                name: 'files',
                yAxisIndex: 1
            },
            {
                data: lines,
                name: 'lines',
                type: 'line'
            }, {
                data: codes,
                name: 'codes',
                type: 'line'
            }
        ],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: true,
            orient: 'horizontal',
            icon: 'rect'
        },
        xAxis: {
            name: 'commits',
            type: 'category',
            data: x
        },
        yAxis: [{
            type: 'value',
            name: 'lines',
            scale: true,
        }, {
            name: 'files',
            type: 'value',
            scale: true,
        }]
    } as EChartsOption)

    c.on('dblclick', p => {
        let i = parseInt(p.name) - 1
        window.open(`https://github.com/Yin-Jinlong/h-ui/commit/${hashes[i]}`, '_blank')
    })

}

function updateChart() {
    getData().then(initChart)
}

onMounted(() => {
    window.addEventListener('theme-change', initChart)
    updateChart()
})

watch(show100, updateChart)

</script>

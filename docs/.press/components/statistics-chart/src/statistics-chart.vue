<template>
    <div data-fill-size>
        <label data-flex-center style="justify-content: start">
            以时间显示
            <h-check-box v-model="timeX"/>
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
import {cssVar, HCheckBox, isDark} from '@yin-jinlong/h-ui'
import type {EChartsOption} from 'echarts'
import {LineChart} from 'echarts/charts'
import {
    DataZoomComponent,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
} from 'echarts/components'
import * as echart from 'echarts/core'
import {SVGRenderer} from 'echarts/renderers'
// @ts-ignore
import type {CallbackDataParams} from 'echarts/types/src/util/types'
import {onMounted, ref, watch} from 'vue'

import {darkTheme, lightTheme} from './theme'

echart.use([
    DataZoomComponent,
    SVGRenderer,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    TitleComponent,
    TooltipComponent,
])

const timeX = ref(true)
const chartEle = ref<HTMLDivElement>()

type WithTime<T> = [Date, T]
type OrWithTime<T> = WithTime<T> | [number, T]

let data: any[] | undefined
let c: echart.ECharts
let x: number[]
let hashes: string[]
let times: Date[]
let files: OrWithTime<number>[]
let lines: OrWithTime<number>[]
let codes: OrWithTime<number>[]

function put<T>(list: OrWithTime<T>[], date: Date, value: T) {
    if (timeX.value) {
        list.push([date, value])
    } else {
        list.push([x.length, value])
    }
}

async function convertData() {
    data?.forEach((line, i) => {
        if (line.length > 1) {
            let [hash, time, file, blank, comment, code] = line
            x.push(i + 1)
            hashes.push(hash)
            let date = new Date(time)
            times.push(date)
            put(files, date, parseInt(file))
            put(lines, date, parseInt(blank) + parseInt(comment) + parseInt(code))
            put(codes, date, parseInt(code))
        }
    })
}

async function getData() {
    x = []
    hashes = []
    times = []
    files = []
    lines = []
    codes = []

    return data ? convertData() : fetch('/cloc.csv').then(res => res.text()).then(async (text) => {
        let [header, ..._data] = text.split('\n').map((line) => line.split(','))
        data = _data
        await convertData()
    })
}

function formatFriendly(num: string) {
    const UNITS = ['', 'K', 'M', 'G', 'T']
    let ui = 0
    let n = parseInt(num)
    while (n > 1024) {
        n = n / 1024
        ui++
    }
    return `${n.toFixed(ui == 0 ? 0 : 2)}${UNITS[ui]}`
}

function formatNum(num: string): string {
    return num.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
}

function formatTimeZone(date: Date) {
    let offset = date.getTimezoneOffset() / -60
    return `GMT${offset >= 0 ? '+' : ''}${offset}`
}

function formatDate(date: Date) {
    let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let timeStr = `${date.getHours()}:${date.getMinutes()}`
    return `${timeStr} ${dateStr} ${formatTimeZone(date)}`
}

function initChart() {
    if (c)
        c.dispose()
    c = echart.init(chartEle.value, isDark() ? darkTheme : lightTheme)
    c!.setOption({
        grid: {
            bottom: 80
        },
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
            trigger: 'axis',
            formatter(args: CallbackDataParams[]) {
                let value = args[0].value[0]
                let isDate = value instanceof Date
                let date: Date = isDate ? value : times[value - 1]
                let s = `<table><thead><tr><th colspan="3" style="color: ${
                    cssVar('color-primary')
                }">${
                    isDate ? '' : (value + '.')} ${formatDate(date)
                }<tbody>`
                const cell = ' align="right" style="padding: 0 0.25em"'
                args.forEach((item, _) => {
                    let head = `${item.marker}${item.seriesName}`
                    s += `<tr>
                    <td align="left">${head}</td>
                    <td${cell}> ${item.seriesName == 'files' ? '' : formatNum(item.data[1].toString())}</td>
                    <td${cell}> <b>${formatFriendly(item.data[1].toString())}</b></td>
                    </tr>`
                })
                return s
            }
        },
        legend: {
            show: true,
            orient: 'horizontal',
        },
        xAxis: {
            name: timeX.value ? 'time' : 'commits',
            nameLocation: 'middle',
            nameGap: 20,
            type: timeX.value ? 'time' : 'category',
        },
        yAxis: [{
            type: 'value',
            name: 'lines',
            scale: true,
        }, {
            name: 'files',
            type: 'value',
            scale: true,
        }],
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {}
        ],
    } as EChartsOption)

    c.on('dblclick', p => {
        window.open(`https://github.com/Yin-Jinlong/h-ui/commit/${hashes[p.dataIndex]}`, '_blank')
    })

}

function updateChart() {
    getData().then(initChart)
}

onMounted(() => {
    window.addEventListener('theme-change', initChart)
    updateChart()
})

watch(timeX, updateChart)

</script>

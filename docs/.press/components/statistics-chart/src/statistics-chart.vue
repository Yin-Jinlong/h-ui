<template>
    <div ref="chartEle" class="chart"/>
</template>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>

<script lang="ts" setup>
import {isDark} from '@yin-jinlong/h-ui'
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
import {onMounted, ref} from 'vue'

echart.use([
    SVGRenderer,
    GraphicComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    TitleComponent,
    TooltipComponent,
])

let darkTheme = {
    darkMode: true,
    backgroundColor: 'transparent',
    line: {
        symbolSize: 4,
        symbol: 'circle'
    },
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        },
    },
    valueAxis: {
        splitLine: {
            show: true,
            lineStyle: {
                color: [
                    '#666'
                ]
            }
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
    },
    legend: {
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: '#aaa',
            }
        }
    }
}

const chartEle = ref<HTMLDivElement>()


let c: echart.ECharts
let x: number[] = []
let hashes: string[] = []
let files: number[] = []
let lines: number[] = []
let codes: number[] = []

async function getData() {
    return fetch('/cloc.csv').then(res => res.text()).then((text) => {
        let [header, ...data] = text.split('\n').map((line) => line.split(','))
        data.forEach((line) => {
            if (line.length > 1) {
                let [hash, file, blank, comment, code] = line
                x.push(x.length + 1)
                hashes.push(hash)
                files.push(parseInt(file))
                lines.push(parseInt(blank) + parseInt(comment) + parseInt(code))
                codes.push(parseInt(code))
            }
        })
    })
}


function initChart() {
    if (c)
        c.dispose()
    c = echart.init(chartEle.value, isDark() ? darkTheme : 'light')
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
            name: 'lines'
        }, {
            name: 'files',
            type: 'value'
        }]
    } as EChartsOption)

    c.on('dblclick', p => {
        let i = parseInt(p.name) - 1
        window.open(`https://github.com/Yin-Jinlong/h-ui/commit/${hashes[i]}`, '_blank')
    })

}


onMounted(() => {
    window.addEventListener('theme-change', initChart)
    getData().then(initChart)
})

</script>

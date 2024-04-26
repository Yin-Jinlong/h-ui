const lineStyle = {
    line: {
        symbolSize: 4,
        symbol: 'circle'
    }
}

export const lightTheme = {
    ...lineStyle
}

export const darkTheme = {
    darkMode: true,
    backgroundColor: 'transparent',
    ...lineStyle,
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

import * as process from "process";
import chalk from "chalk";

let os = process.stdout

/**
 * 输出（到stdout）
 * @param text 输出内容
 */
export function out(...text: (string | Uint8Array)[]) {
    for (const t of text) {
        os.write(t)
    }
}

/**
 * 输出（到stdout）并换行
 * @param text 输出内容
 */
export function outln(...text: (string | Uint8Array)[]) {
    out(...text)
    os.write('\n')
}

/**
 * 转换（耗时）时间（到字符串）
 * @param time 时间
 */
export function convertTime(time: number): string {
    let ms = Math.round(time % 1000)
    time = Math.floor(time / 1000)
    let s = time % 60
    time = Math.floor(time / 60)
    return time === 0 ? `${s}.${ms}s` : `${time}m${s}.${ms}s`
}

interface SizeConvertResult {
    size: number
    unit: string
}

/**
 * 转换（大小）
 * @param size 大小
 * @param min 进位最小值（阈值）
 * @param fixed 小数位
 * @return [size, unit]
 */
export function convertSize(size: number, min: number = 0.9 * 1024, fixed: number = 2): SizeConvertResult {
    const uints = "KMGT"
    if (size < min)
        return {
            size,
            unit: 'B'
        }
    let ui = -1
    do {
        size /= 1024
        ui++
    } while (size > min)
    let s = size.toFixed(fixed).toString()
    while (s[s.length - 1] === '0')
        s = s.slice(0, s.length - 1)
    if (s[s.length - 1] === '.')
        s = s.slice(0, s.length - 1)
    return {
        size: parseFloat(s),
        unit: uints[ui] + 'B'
    }
}

export const color = {
    /**
     * 操作，行动，命令结束
     * @param text 内容
     */
    action(...text: unknown[]): string {
        return chalk.green(text)
    },
    /**
     * 命令
     * @param text 内容
     */
    cmd(...text: unknown[]): string {
        return chalk.cyan(text)
    },
    /**
     * 危险
     * @param text 内容
     */
    danger(...text: unknown[]): string {
        return chalk.red(text)
    },
    /**
     * 强调
     * @param text 内容
     */
    emphasize(...text: unknown[]): string {
        return chalk.magenta(text)
    },
    /**
     * 灰色
     * @param text 内容
     */
    gray(...text: unknown[]): string {
        return chalk.gray(text)
    },
    /**
     * 数字
     * @param text 内容
     */
    num(...text: unknown[]): string {
        return chalk.greenBright(text)
    },
    /**
     * 路径
     * @param text 内容
     */
    path(...text: unknown[]): string {
        return chalk.yellow(text)
    }
}

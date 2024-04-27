import ora, {Ora} from 'ora'

let spinner: Ora

export function oraStart(...text: string[]) {
    spinner = ora()
    spinner.start(text.join(''))
}

export function oraSucceed(...text: string[]) {
    spinner.succeed(text.join(''))
}

export function oraFail(...text: string[]) {
    spinner.fail(text.join(''))
}

export function oraText(...text: string[]) {
    spinner.text = text.join('')
}

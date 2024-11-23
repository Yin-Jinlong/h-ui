export function packRange(v: number, min: number, max: number) {
    return v < min ? min : v > max ? max : v
}

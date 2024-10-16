class Vec2 {
    x: number
    y: number

    constructor(x: number, y: number,) {
        this.x = x
        this.y = y
    }

    add(v: Vec2) {
        this.x += v.x
        this.y += v.y
        return this
    }

    added(v: Vec2) {
        return this.clone().add(v)
    }

    sub(v: Vec2) {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    subed(v: Vec2) {
        return this.clone().sub(v)
    }

    mul(v: number) {
        this.x *= v
        this.y *= v
        return this
    }

    muled(v: number) {
        return this.clone().mul(v)
    }

    div(v: number) {
        this.x /= v
        this.y /= v
        return this
    }

    rotate(deg: number) {
        let rad = deg * Math.PI / 180
        let cos = Math.cos(rad)
        let sin = Math.sin(rad)
        let x = this.x * cos - this.y * sin
        let y = this.x * sin + this.y * cos
        this.x = x
        this.y = y
        return this
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }

    clone() {
        return new Vec2(this.x, this.y)
    }

}

export {Vec2}
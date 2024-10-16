import {Vec2} from './vec2'

class Body {
    pos: Vec2
    v: Vec2
    a: Vec2
    color: string
    poses: Vec2[] = []

    step(dt: number) {
        this.pos.add(this.v.muled(dt))
        this.v.add(this.a.muled(dt))
        this.poses.unshift(this.pos.clone())
        if (this.poses.length > 10) {
            this.poses.pop()
        }
    }

    drawCircle(canvas: CanvasRenderingContext2D, x: number, y: number, r: number) {
        canvas.beginPath()
        canvas.arc(x, y, r, 0, 6.283)
        canvas.fill()
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = this.color
        canvas.strokeStyle = this.color
        canvas.lineCap = 'round'
        canvas.beginPath()
        canvas.moveTo(this.pos.x, this.pos.y)
        for (let pos of this.poses) {
            canvas.lineTo(pos.x, pos.y)
        }
        canvas.stroke()
        this.drawCircle(canvas, this.pos.x, this.pos.y, 2)
    }

    isOut(l: number, t: number, r: number, b: number) {
        let p = this.poses[this.poses.length - 1] ?? this.pos
        return p.x < l || p.y < t || p.x > r || p.y > b
    }

    private color0() {
        return `hsl(${Math.random() * 360} ${Math.random() * 50 + 50} ${Math.random() * 30 + 20})`
    }

    constructor() {
        this.pos = new Vec2(0, 0)
        this.v = new Vec2(0, 0)
        this.a = new Vec2(0, 0)
        this.color = this.color0()
    }
}

class Word {
    bodies: Set<Body>
    dom: HTMLCanvasElement
    canvas: CanvasRenderingContext2D

    constructor() {
        this.bodies = new Set<Body>()
        let canvasEle = document.createElement('canvas')
        canvasEle.width = window.innerWidth
        canvasEle.height = window.innerHeight
        canvasEle.style.position = 'fixed'
        canvasEle.style.zIndex = '-1'
        canvasEle.style.pointerEvents = 'none'
        canvasEle.style.opacity = '0.1'
        document.body.append(canvasEle)
        this.canvas = canvasEle.getContext('2d')!
        this.dom = canvasEle
        window.addEventListener('resize', () => {
            this.dom.width = window.innerWidth
            this.dom.height = window.innerHeight
        })
    }

    add(body: Body) {
        this.bodies.add(body)
    }

    step(dt: number) {
        let padding = 50
        let delList: Body[] = []
        this.canvas.clearRect(0, 0, this.dom.width, this.dom.height)
        for (let body of this.bodies) {
            body.step(dt)
            body.draw(this.canvas)
            if (body.isOut(-padding, -padding, this.dom.width + padding, this.dom.height + padding))
                delList.push(body)
        }
        for (let body of delList) {
            this.bodies.delete(body)
        }
    }

}

export {Word, Body}

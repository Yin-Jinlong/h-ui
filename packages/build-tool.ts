import fs from "fs"

export function clean(path: fs.PathLike): boolean {
    if (fs.existsSync(path)) {
        fs.rmSync(path, {
            recursive: true,
            force: true
        })
        return true
    }
    return false
}

export function cleanAndMake(path: fs.PathLike) {
    if (fs.existsSync(path))
        fs.rmSync(path, {
            recursive: true,
            force: true
        })
    fs.mkdirSync(path, {
        recursive: true
    })
}

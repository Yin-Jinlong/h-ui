export type OptionalKey<T> ={
    [key in keyof T]?:T[key]
}

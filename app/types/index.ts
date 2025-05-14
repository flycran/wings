// 递归只读
type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends object
    ? DeepReadonlyObject<T>
    : T

// 处理数组的情况
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>

// 处理对象的情况
type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

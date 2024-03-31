# Packages

## components 组件

全小写短横线连接命名

组件结构

- `_TEST_` 测试
- `src` 源码
- `style` 样式（ts引入）
- `index.ts` 引入

### `_TEST_`

- `<component>.test.ts`
- `<utilname>.test.ts`

### `src`

- `<component>.vue` 组件
- `expose.ts` 组件导出
- `props.ts` 组件属性
- `type.ts` 组件内部类型
- `<util>.ts` 组件内部工具

### `style`

- `index.ts`

内容：

```ts
import '<path>/<name>.scss'
```

### `index.ts`

内容：
```ts
import Component from './src/component.vue'

export const HComponent= Component

export * from './src/expose'
export * from './src/props'
export * from './src/type'
export * from './src/...'

export default HComponent

```

## style 样式

- `theme` 主题变量
- `tools` 工具
- `index.scss` 引入所有默认（不含其他主题）
- `var.scss` 变量
- `base.scss` 基本样式，`:root`等
- `<name>.scss` 组件样式

## types 类型

仅包含类型，不含执行代码或对象。

- `<name>.ts`

## utils 工具

组件通用工具。

目录：

- `_TEST_` 测试
- `<name>.ts` 测试

### \_TEST_

- `<filename>.test.ts`

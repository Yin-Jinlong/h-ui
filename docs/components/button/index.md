---
title: H-UI-Button
---

# Button 按钮

## 类型

按钮的类型，主要指样式。默认为空，没有边框和颜色。

- `primary`为主要的按钮，颜色饱和度高。
- `plain`为普通按钮，带有半透明边框，半透明背景。
- `link`为链接按钮，有颜色，可以有边框和阴影。
- `text`为文本按钮。

[.types]

## 颜色

按钮的颜色。可以是已经定义的颜色（如`primary`），
也可以是有效的`css`颜色值（如`red` `#39e` `var(--my-color-var)`）。

[.colors]

## 尺寸

尺寸大小。通过内边距实现。

- `small`
- `normal`
- `large`
- `xlarge`

[.sizes]

## 边框

按钮的边框。主要按钮边框宽度为`2px`，其他按钮宽度为`1px`。

[.borders]

## 阴影&禁用

按钮的阴影。

- `false`|`undefined` 不显示阴影。
- `hover`悬浮时显示阴影。
- `true`|`always`始终显示阴影。

禁用只需加上`disabled`属性即可。

[.shadows]

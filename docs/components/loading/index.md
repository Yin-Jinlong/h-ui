---
title: H-UI-Loading
---

# Loading 加载

`Loading`可以用在`HTML`元素上。

`Loading` 使用绝对定位，推荐所属元素设置`position`。

<br>

指令`vLoading`使用即加载。可以传入`boolean`或`object`。

<br>

`object`配置:

- `loading`: `boolean` 是否显示
- `component`: `Component | string` 加载时显示的组件，可以是已经注册的组件名（`registerLoadingComponent`）。
- `size`: `string` 尺寸，有效`css`尺寸。
- `width`: `string` 描边宽度，默认`2px`。
- `color`: `DefinedNamedColor | string` 描边颜色。
- `modal`: `boolean | DefinedNamedColor | string` 背景颜色。

## 块内

[.loading]

## 颜色

[.colors]

## 加载文字

使用`h-loading-text` 属性设置。

[.text]

## 全屏

在指令上添加`fullscreen`修饰符。

[.fullscreen]

## 大小

[.sizes]

## 不同样式（全局命名注册）

默认有：

- `circle`默认值。
- `running`

[.types]

---
title: 快速开始-H-UI
---

## 安装

```shell
pnpm i @yin-jinlong/h-ui
```

## 使用

从`@yin-jinlong/h-ui`可引入组件。

样式表不会自动包含，需要手动引入。

```ts
// import '@yin-jinlong/h-ui/style/css/index.css'
import '@yin-jinlong/h-ui/style/src/index.scss'
// 或者引入单个组件样式
// import '@yin-jinlong/h-ui/components/button/style'
```

或在入口样式表添加

```scss
@import '@yin-jinlong/h-ui/style/src/index.scss';
@import '@yin-jinlong/h-ui/style/src/base-dark.scss';
```

示例：

```vue
<template>
    <h-button>按钮</h-button>
</template>

<script lang="ts" setup>
    import {HButton} from '@yin-jinlong/h-ui'
    import '@yin-jinlong/h-ui/components/button/style'
</script>
```

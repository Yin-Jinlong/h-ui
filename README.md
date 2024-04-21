# <div align=center>氢-UI</div>

<div align=center>

[//]: # (概览)

[![GitHub License](https://img.shields.io/github/license/Yin-Jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/blob/main/LICENSE.md)
[![GitHub Tag](https://img.shields.io/github/v/tag/yin-jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/tags)
[![GitHub Release](https://img.shields.io/github/v/release/yin-jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/releases)
[![codecov](https://codecov.io/gh/Yin-Jinlong/h-ui/graph/badge.svg?token=VCK8VB6I3Y)](https://codecov.io/gh/Yin-Jinlong/h-ui)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ce230d3a-0722-4288-95d5-515de080efce/deploy-status)](https://app.netlify.com/sites/h-ui/deploys)

[//]: # (npm)
[![NPM Version](https://img.shields.io/npm/v/%40yin-jinlong%2Fh-ui)](https://www.npmjs.com/package/@yin-jinlong/h-ui)
[![NPM Downloads](https://img.shields.io/npm/dm/%40yin-jinlong%2Fh-ui)](https://www.npmjs.com/package/@yin-jinlong/h-ui)

[//]: # (仓库信息)

![GitHub repo size](https://img.shields.io/github/repo-size/Yin-Jinlong/h-ui)
[![GitHub forks](https://img.shields.io/github/forks/Yin-Jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/forks)
[![GitHub Repo stars](https://img.shields.io/github/stars/Yin-Jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/stargazers)

[//]: # (活动)

[![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/Yin-Jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/activity)
[![GitHub contributors](https://img.shields.io/github/contributors/Yin-Jinlong/h-ui)](https://github.com/Yin-Jinlong/h-ui/graphs/contributors)
[![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Yin-Jinlong/h-ui/main)](https://github.com/Yin-Jinlong/h-ui/activity)

</div>

一个`Vue.js 3` UI 组件库

加速站点：

- [netlify](https://docs-netlify.h-ui.linkpc.net/)

## 使用

### 安装

```shell
pnpm install @yin-jinlong/h-ui
```

### 组件导入

以`Button`为例

- 组件`import {Button} from '@yin-jinlong/h-ui'`
- 样式`import '@yin-jinlong/h-ui/components/button/style'`

样式也可以引入编译后的`css`文件

```ts
// base.css不会自动引入，需要手动引入
import '@yin-jinlong/h-ui/style/css/base.css'
import '@yin-jinlong/h-ui/style/css/button.css'
```

引入全部样式
```ts
import '@yin-jinlong/h-ui/style/css/index.css'
```

样式源码在`style/src`下

```ts
// base.scss不会自动引入，需要手动引入
import '@yin-jinlong/h-ui/style/src/base.scss'
import '@yin-jinlong/h-ui/style/src/button.scss'
```

## 开发

### 安装

```shell
pnpm install
```

### 构建

<details>
  <summary>组件库</summary>

```shell
pnpm run packages:build
```

</details>

<details>
  <summary>文档</summary>

```shell
pnpm run docs:build
```

</details>

### 测试

<details>
  <summary>组件库</summary>

```shell
pnpm run packages:test
```

</details>

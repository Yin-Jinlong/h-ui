# ts/js import 标准

## 1.范围

1. `node:*`
2. `node_modules`
3. `path`

不使用`import * as`

## 2.引入顺序

### 排序

类型

1. `import`
2. `import assets named`
3. `import assets`

模块

- 按模块名排序

引入

- 按引入名称顺序排序
- `default`在最前

## 示例

```ts
import {afun} from 'A'

import {fun1} from '@/m2'

import {T2,fun2} from './utils'

import json from './config.json'

import 'style.css'

```

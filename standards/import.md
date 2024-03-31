# ts/js import 标准

## 1.范围

1. `node:*`
2. `node_modules`
3. `path`

不使用`import * as`

## 2.引入顺序

### 排序

类型

1. `import type`
2. `import`
3. `import assets named`
4. `import assets`

分组

1. `node:*`
2. `node_modules`
3. `other_project_module`
4. `project`

模块

- 按模块名排序

引入

- 按引入名称顺序排序
- `default`在最前
- `var`>`class`>`function`

## 示例

```ts
// node 在最前
import type {Dirent} from 'fs'
import type {ParsedPath} from 'path'
import {existsSync} from 'fs'
import http from 'http'

// node_module
import type {A} from 'A'
import type {B, C} from 'X'
import {afun} from 'A'

import type {T1} from '@/m1'
import {fun1} from '@/m2'

import type {T2} from './type'
import {fun2} from './utils'

import json from './config.json'

import 'style.css'

```

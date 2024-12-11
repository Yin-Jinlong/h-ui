---
title: H-UI-Message
---

# Message 消息提示

tip: `Message`依赖于`Card`

## 颜色

[.colors]

## 显示时长

时长为毫秒数字。默认为`3000`毫秒。

[.durations]

## 内容

内容可以是字符串或组件

[.content]

## 关闭

关闭不存在的id时不会报错。

配置`onClose:(id:number)=>void`会在关闭前触发。

`closeAll`只会关闭调用时在显示的消息。

[.close]

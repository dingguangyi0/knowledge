---
sidebar_position: 2
title: node.js常用工具使用
---
## node.js常用工具使用
### nrm 
nrm 是一个 npm 源管理器，允许你快速地在 npm源间切换。

#### 如何配置yarn以使用私有注册表
只需在项目目录中添加 .yarnrc 并在那里写入： registry “http://your.registry”
或者您可以在 HOME 目录的 .yarnrc 中配置它

#### 安装 
```shell
npm install -g nrm
```

#### 用法
> 列出所有注册表
```shell
nrm ls 
```
> 显示当前注册表名称
```shell
nrm current 
```
> 测试所有源时间
```shell
nrm test 
```

> 切换注册表
```shell
nrm use npm
```

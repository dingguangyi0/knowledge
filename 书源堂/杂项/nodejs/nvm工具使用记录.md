---
sidebar_position: 1
title: nvm版本管理器使用
---

[nvm官网地址](https://github.com/nvm-sh/nvm#intro)
## nvm版本管理器使用
nvm 是node.js的版本管理器，是一个用于管理Node.js版本的工具，可以帮助开发者在不同的项目中切换和管理不同的Node.js版本

### 安装

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```


```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

### 常用命令总结

> 下载、编译和安装最新版本的nodejs
```shell
nvm install node # "node" is an alias for the latest version
```

> 安装特定版本的nodejs
- 通过改地址查找nodejs所有版本 [nodejs地址](https://nodejs.org/dist/)
```shell
nvm install 14.7.0 # or 16.3.0,18.9.1
```

> 列出可安装版本
```shell
nvm ls-remote
```
> 列出本地版本
```shell
nvm ls
```
> 切换版本
```shell
nvm use 14.7.0
```

> 获取可执行文件的安装路径
```shell
nvm which 12.22
```



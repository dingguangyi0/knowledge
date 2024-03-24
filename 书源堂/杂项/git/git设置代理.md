---
sidebar_position: 10
title: git设置代理
---

## 缘起
这段时间在整理github,发现使用git推送代码很慢,经常超时, 开了科学上网也不行,查询发现,git 可以单独设置代理

## 详情
1. 设置HTTP代理,可以按照以下步骤进行设置：
- 打开终端或命令行界面
- 输入以下命令，将代理服务器地址和端口号设置为你需要的值

**全局设置**
```shell
git config --global http.proxy http://<proxy_server>:<port>
```

**当前目录设置**
```shell
git config http.proxy http://proxy_server:port
git config https.proxy https://proxy_server:port
```
将proxy_server替换为代理服务器地址，将port替换为代理服务器端口号。例如，如果你的代理服务器地址是example.com，端口号是8080，那么命令应该是

> 示例

```shell
git config --global http.proxy http://example.com:8080
git config --global https.proxy http://example.com:8080
```

- 确认设置是否生效。你可以输入以下命令查看当前的代理设置：
```shell
### 查看全局设置
git config --global http.proxy
git config --global https.proxy

## 查看当前目录设置
git config http.proxy
git config https.proxy
```
## 注意事项
1. 在进行代理设置时，请确保你具有正确的代理服务器地址和端口号。
2. 如果你不需要使用代理，可以取消相应的设置。例如，输入以下命令可以取消HTTP代理设置

```shell
### 卸载全局设置
git config --global -unset http.proxy
git config --global -unset https.proxy

## 卸载当前目录设置
git config -unset http.proxy
git config -unset https.proxy
```
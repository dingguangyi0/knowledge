---
sidebar_position: 1
title: Maven插件介绍
---
# 简介
Maven 由一个核心引擎组成，该引擎提供基本的项目处理功能和构建过程管理，以及大量用于执行实际构建任务的插件。

## 什么是Maven插件
“Maven”实际上只是 Maven 插件集合的核心框架。换句话说，插件是执行大部分实际操作的地方，插件用于：创建 jar 文件、创建 war 文件、编译代码、单元测试代码、创建项目文档等等。您能想到在项目上执行的几乎所有操作都是作为 Maven 插件实现的。

插件是 Maven 的核心功能，允许在多个项目中重用通用构建逻辑。他们通过在项目描述（项目对象模型 （POM））的上下文中执行“操作”（即创建 WAR 文件或编译单元测试）来做到这一点。插件行为可以通过一组独特的参数进行自定义，这些参数由每个插件目标（或 Mojo）的描述公开。

Maven 中最简单的插件之一是 Clean 插件。Maven Clean 插件 （maven-clean-plugin） 负责删除 Maven 项目的目标目录。当您运行 “mvn clean” 时，Maven 会执行 Clean 插件中定义的 “clean” 目标，并删除目标目录。Clean 插件定义了一个可用于自定义插件行为的参数，该参数称为 outputDirectory，默认为 `${project.build.directory}`

## 什么是 Mojo
Mojo 实际上只是 Maven 中的一个目标，插件由任意数量的目标 （Mojos） 组成。Mojos 可以定义为带注释的 Java 类或 Beanshell 脚本。Mojo 指定有关目标的元数据：目标名称、它适合生命周期的哪个阶段以及它期望的参数。

MOJO 是对 POJO（Plain-old-Java-object）的改编，用“Maven”代替了“Plain”。Mojo 也是一个有趣的词（见定义）。在维基百科中，“魔力”被定义为：“......一个人穿在衣服下面的小袋子（也称为魔力手）。这种袋子被认为具有超自然的力量，例如保护邪恶、带来好运等。

## 什么是构建生命周期？
构建生命周期是一系列公共阶段，所有项目构建都通过这些阶段自然进行。插件目标与生命周期中的特定阶段绑定。

Maven 的生命周期（Lifecycle）和生命周期阶段（LifecyclePhase）是构建过程中的核心概念。Maven 构建的生命周期由一系列的生命周期阶段组成，每个阶段都对应一个特定的构建任务。

Maven 4.0.0 之后的版本中，每个生命周期阶段实际上是一个特殊的构建目标（goal），它的名字是 `<phase>` 或 `<goal>`，如 `validate`, `compile`, `test`, `package`, `install`, `deploy` 等。这些目标之间存在依赖关系，Maven 会按照这些依赖关系来执行它们。

以下是一些常见的 Maven 生命周期阶段和它们的含义：

1. **validate**：验证项目是否正确，所有的 POM 文件是否有错误。
2. **initialize**：初始化构建环境，这个阶段实际上并没有对应的构建任务。
3. **generate-sources**：生成源代码，这个阶段实际上并没有对应的构建任务。
4. **compile**：编译源代码。
5. **process-sources**：处理源代码，这个阶段实际上并没有对应的构建任务。
6. **generate-resources**：生成资源文件。
7. **process-resources**：复制资源到目标目录。
8. **compile-tests**：编译测试源代码。
9. **process-test-resources**：处理测试资源。
10. **test-compile**：编译测试源代码。
11. **process-test-sources**：处理测试源代码，这个阶段实际上并没有对应的构建任务。
12. **test**：运行单元测试。
13. **package**：将编译后的代码打包成 JAR、WAR 或 EAR 文件。
14. **install**：安装打包好的包到本地仓库，以便其他项目使用。
15. **deploy**：将打包好的包复制到远程仓库或发布到某个位置。

每个生命周期阶段都可以通过在命令行中执行 `mvn <phase>` 来执行，例如 `mvn compile` 会执行 `compile` 生命周期阶段。

注意，并不是所有的项目都需要执行所有的生命周期阶段，例如一个简单的 Java 项目可能只需要执行 `compile` 和 `package` 阶段。Maven 会根据项目的需要自动决定需要执行哪些阶段。





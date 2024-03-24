---
sidebar_position: 2
title: Maven插件开发流程
---
# Maven 插件开发指南

本指南旨在帮助用户开发适用于 Maven 的 Java 插件。

## 重要提示

:::tip
您通常会将插件命名为 `<yourplugin>`-maven-plugin

强烈建议不要调用它（注意“Maven”位于插件名称的开头），因为它是由 Apache Maven 团队使用 groupId 维护的官方 Apache Maven 插件的保留命名模式。
** "maven-`<yourplugin>`-plugin" org.apache.maven.plugins **
使用此命名模式是对 Apache Maven 商标的侵犯。

禁止使用这样格式的命名 "maven-`<yourplugin>`-plugin"

推荐使用 `<yourplugin>`-maven-plugin
:::

## 你的第一个插件

在本节中，我们将构建一个简单的插件，其目标只有一个，它不带任何参数，运行时只需在屏幕上显示一条消息。在此过程中，我们将介绍设置项目以创建插件的基础知识、定义目标代码的 Java mojo 的最小内容，以及执行 mojo 的几种方法

## 你的第一个MOJO

简单来说，Java mojo 仅由一个代表一个插件目标的类组成。不需要像 EJB 那样的多个类，尽管包含许多相似 mojo 的插件可能会使用一个抽象的超类来整合所有 mojo 通用的代码。

在处理源代码树以查找 mojo 时， plugin-tools 会查找带有**@Mojo**注解的类。任何带有此注解的类都包含在插件配置文件中。

### 一个简单的MOJO

下面列出的是一个简单的 mojo 类，它没有参数。列表后面是对来源各个部分的描述

```java
package sample.plugin;
 
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
 
/**
 * Says "Hi" to the user.
 *
 */
@Mojo(name = "sayhi")
public class GreetingMojo extends AbstractMojo
{
    public void execute() throws MojoExecutionException
    {
        getLog().info("Hello, world.");
    }
}
```

- 该类提供了实现 mojo 所需的大部分基础结构，但方法除外。org.apache.maven.plugin.AbstractMojo.execute
- 注解 “@Mojo” 是必需的，用于控制 mojo 的执行方式和时间。
- 如果出现问题，execute方法可以引发此异常(org.apache.maven.plugin.MojoExecutionException)会导致显示一条消息 BUILD FAILURE
- 该方法（定义于 ）返回一个类似 log4j 的记录器对象，该对象允许插件在 “debug”、“info”、“warn” 和 “error” 级别创建消息。此记录器是向用户显示信息的公认方式。请查看检索 Mojo Logger 部分，以获取有关其正确使用的提示。**getLog** **AbstractMojo**

## 项目定义

一旦开始构建Maven插件,项目中很多描述需要正确配置：

| 参数           | 描述                                         |
|--------------|--------------------------------------------|
| groupId      | 这是插件的组 ID，应将通用前缀与 mojo 使用的包匹配              |
| artifactId   | 这是插件的名称                                    |
| version      | 这是插件的版本                                    |
| packaging    | 这必须设置为”maven-plugin"                       |
| dependencies | 必须向Maven 插件工具 API 声明依赖项才能解析 “AbstractMojo” |

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
 
  <groupId>sample.plugin</groupId>
  <artifactId>hello-maven-plugin</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>maven-plugin</packaging>
 
  <name>Sample Parameter-less Maven Plugin</name>
 
  <properties>
    <maven-plugin-tools.version>3.10.2</maven-plugin-tools.version>
  </properties>
 
  <dependencies>
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-plugin-api</artifactId>
      <version>3.0</version>
      <scope>provided</scope>
    </dependency>
 
    <!-- dependencies to annotations -->
    <dependency>
      <groupId>org.apache.maven.plugin-tools</groupId>
      <artifactId>maven-plugin-annotations</artifactId>
      <version>${maven-plugin-tools.version}</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
 
  <build>
    <pluginManagement>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-plugin-plugin</artifactId>
        <version>${maven-plugin-tools.version}</version>
        <executions>
          <execution>
            <id>help-mojo</id>
            <goals>
              <!-- good practice is to generate help mojo for plugin -->
              <goal>helpmojo</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </pluginManagement>
  </build>
</project>
```

## 构建插件

| 参数              | 描述               |
|-----------------|------------------|
| compile         | 编译插件的 Java 代码    |
| process-classes | 提取数据以构建插件描述符     |
| test            | 运行插件的单元测试        |
| package         | 构建插件 jar         |
| install         | 在本地存储库中安装插件 jar  |
| deploy          | 将插件 jar 部署到远程存储库 |

## 执行插件
找到一个项目,为项目配置上 **hello-maven-plugin**
```xml
<project>
...
  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>sample.plugin</groupId>
          <artifactId>hello-maven-plugin</artifactId>
          <version>1.0-SNAPSHOT</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
...
</project>
```
### 单独运行插件
单独运行插件就是,独立于项目生命周期的,就像你使用mvn clean 插件类似
我们可以使用以下命令运行插件
```shell
mvn groupId:artifactId:version:goal
```
例如，要在示例插件中运行简单的 mojo，您需要在命令行中输入 **mvn sample.plugin:hello-maven-plugin:1.0-SNAPSHOT:sayhi**。

::: tips
提示：运行独立目标不需要。version
:::

> 缩短命令行
上面的输入好像有点麻烦,maven提供了一下几种方法可以减少所需输入的命令
1. 如果需要运行本地存储库中安装的插件的最新版本，可以省略其版本号。因此，只需使用**mvn sample.plugin:hello-maven-plugin:sayhi**来运行您的插件。
2. 如果你的插件遵守命名规则(`${prefix}`-maven-plugin) ,那么可以直接通过maven-plugin-plugin插件,在POM中的配置参数指定前缀
```shell
<project>
  ...
  <build>
    ...
    <plugins>
      ...
      <plugin>
        <artifactId>maven-plugin-plugin</artifactId>
        <version>2.3</version>
        <configuration>
          ...
          <goalPrefix>hello</goalPrefix>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```
命令可以简化为
```shell
mvn hello:goal
```
3. 配置 Maven settings.xml
```xml
<pluginGroups>
  <pluginGroup>sample.plugin</pluginGroup>
</pluginGroups>
```
命令可以简化为
```shell
mvn hello:goal
```

### 附加插件在项目构建生命周期中运行
还可以配置插件以将特定目标附加到构建生命周期的特定阶段。下面是一个示例：
```xml
<build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>sample.plugin</groupId>
          <artifactId>hello-maven-plugin</artifactId>
          <version>1.0-SNAPSHOT</version>
        </plugin>
      </plugins>
    </pluginManagement>  
    <plugins>
      <plugin>
        <groupId>sample.plugin</groupId>
        <artifactId>hello-maven-plugin</artifactId>
        <executions>
          <execution>
              //指定哪个阶段运行
            <phase>compile</phase> 
            <goals>
              <goal>sayhi</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
```
## 总结 
上面就是构建一个Maven 插件的全部流程,和一些注意事项, 可能你还不太懂,那你可以阅读这篇文章进行快速开发


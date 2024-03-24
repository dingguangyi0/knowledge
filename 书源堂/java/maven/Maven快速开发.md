---
sidebar_position: 3
title: Maven快速开发
---
# 插件快速开发
demo 地址 https://github.com/dingguangyi0/maven-plugin-example

Maven 插件开发指南 详细介绍了开发一个插件的全流程和注意事项,接下来让我们真正上手实践一下吧

## 快速创建插件模版
要创建新的插件项目，您可以将 Mojo 原型与以下命令行一起使用：
```shell
mvn archetype:generate \
  -DgroupId=fun.ycdr.example \
  -DartifactId=YcExample-maven-plugin \
  -DarchetypeGroupId=org.apache.maven.archetypes \
  -DarchetypeArtifactId=maven-archetype-plugin
```
- groupId 参数是你项目目录
- artifactId 参数是你Maven插件名称（注意命名规范）

## 调整POM.xml
maven提供的依据原型生成的项目,版本号都很低,所以我们需要调整一下
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>fun.ycdr.example</groupId>
  <artifactId>YcExample-maven-plugin</artifactId>
  <packaging>maven-plugin</packaging>
  <version>1.0.0</version>

  <name>YcExample-maven-plugin Maven Mojo</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <!--maven-->
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-core</artifactId>
      <version>3.8.3</version>
    </dependency>
    <!-- plugin API and plugin-tools-->
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-plugin-api</artifactId>
      <version>3.8.3</version>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>org.apache.maven.plugin-tools</groupId>
      <artifactId>maven-plugin-annotations</artifactId>
      <version>3.8.2</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.7.0</version>
      </plugin>
      <plugin>
        <artifactId>maven-install-plugin</artifactId>
        <version>2.5.2</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-plugin-plugin</artifactId>
        <version>3.5.1</version>
        <configuration>
          <!--配置自己的差距前缀-->
          <goalPrefix>yc</goalPrefix>
        </configuration>
        <executions>
          <execution>
            <id>default-descriptor</id>
            <phase>process-classes</phase>
          </execution>
          <execution>
            <id>generated-helpmojo</id>
            <goals>
              <goal>helpmojo</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>

```

## 简单MOJO
```java
@Mojo(
        name = "msg",
        defaultPhase = LifecyclePhase.INITIALIZE
)
public class YcMojo extends AbstractMojo {

    @Parameter
    private String msg;

    @Override
    public void execute() throws MojoExecutionException, MojoFailureException {
        getLog().info("来自外界的消息-{"+msg+"}");
    }
}
```

## 创建项目 example
引入插件
```xml

    <build>
        <plugins>
            <plugin>
                <groupId>fun.ycdr.example</groupId>
                <artifactId>YcExample-maven-plugin</artifactId>
                <version>1.0.0</version>
                <executions>
                    <execution>
                        <!--如果通过@Mojo注解已经配置了执行阶段可以忽略-->
                        <phase>initialize</phase>
                        <!--设置执行的Mojo（一个插件可以有多个）-->
                        <goals>
                            <goal>msg</goal>
                        </goals>
                        <!--参数配置-->
                        <configuration>
                            <msg>你好,maven插件</msg>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```
## 执行查看效果
绑定到项目执行的周期中执行插件
```shell
mvn clean install

[INFO] 
[INFO] --- YcExample-maven-plugin:1.0.0:msg (default) @ example ---
[INFO] 来自外界的消息-{你好,maven插件}

```
单独执行插件
```shell
 mvn yc:msg
 
[INFO] --- YcExample-maven-plugin:1.0.0:msg (default-cli) @ example ---
[INFO] 来自外界的消息-{null}
[INFO] ------------------------------------------------------------------------

```

## 开发一个maven插件就是你这么简单,快去开发一个来增强你的项目功能吧
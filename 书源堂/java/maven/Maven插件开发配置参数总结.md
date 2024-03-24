---
sidebar_position: 4
title: Maven插件开发配置参数总结
---
## 注解参数常用参数

```java
import org.apache.maven.execution.MavenSession;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecution;
import org.apache.maven.plugin.descriptor.PluginDescriptor;
import org.apache.maven.plugins.annotations.Component;
import org.apache.maven.plugins.annotations.Execute;
import org.apache.maven.plugins.annotations.InstantiationStrategy;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.plugins.annotations.ResolutionScope;
import org.apache.maven.project.MavenProject;
import org.apache.maven.settings.Settings;
 
/**
 * Mojo Description. @Mojo( name = "<goal-name>" ) is the minimal required annotation.
 *
 * @since <since-text>
 * @deprecated <deprecated-text>
 */
@Mojo( name = "<goal-name>", // 定义该 Mojo 的名称 （goal 配置使用） 
       aggregator = <false|true>, 
       configurator = "<role hint>",
       executionStrategy = "<once-per-session|always>", // (unsupported since Maven 3.0)
       inheritByDefault = <true|false>, // (unsupported since Maven 3.0)
       instantiationStrategy = InstantiationStrategy.<strategy>,
       defaultPhase = LifecyclePhase.<phase>,
       requiresDependencyResolution = ResolutionScope.<scope>,
       requiresDependencyCollection = ResolutionScope.<scope>, // (since Maven 3.0)
       requiresDirectInvocation = <false|true>, // (unsupported since Maven 3.0)
       requiresOnline = <false|true>,
       requiresProject = <true|false>,
       requiresReports = <false|true>, // (unsupported since Maven 3.0)
       threadSafe = <false|true> ) // (since Maven 3.0)
@Execute( goal = "<goal-name>",
          phase = LifecyclePhase.<phase>,
          lifecycle = "<lifecycle-id>" )
public class MyMojo
    extends AbstractMojo
{
    /**
     * Parameter description.
     *
     * @since <since-text>
     * @deprecated <deprecated-text>
     */
    @Parameter( name = "parameter",
                alias = "myAlias",
                property = "a.property",
                defaultValue = "an expression, possibly with ${variables}",
                readonly = <false|true>,
                required = <false|true> )
    private String parameter;
 
    @Component( role = MyComponentExtension.class,
                hint = "..." )
    private MyComponent component;
 
    // sample objects taken from Maven API through PluginParameterExpressionEvaluator
 
    @Parameter( defaultValue = "${session}", readonly = true )
    private MavenSession session;
 
    @Parameter( defaultValue = "${project}", readonly = true )
    private MavenProject project;
 
    @Parameter( defaultValue = "${mojoExecution}", readonly = true )
    private MojoExecution mojo;
 
    @Parameter( defaultValue = "${plugin}", readonly = true ) // Maven 3 only
    private PluginDescriptor plugin;
 
    @Parameter( defaultValue = "${settings}", readonly = true )
    private Settings settings;
 
    @Parameter( defaultValue = "${project.basedir}", readonly = true )
    private File basedir;
 
    @Parameter( defaultValue = "${project.build.directory}", readonly = true )
    private File target;
 
    /**
     * @Parameter for methods can be used only with public setter methods
    */
    @Parameter( ... )
    public setOutput( File output )
    {
        ...
    }
 
    public void execute()
    {
        ...
    }
}
```
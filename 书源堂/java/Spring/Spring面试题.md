## Spring框架中的单例bean是线程安全的吗?
不是线程安全的,当多用户同时请求一个服务时,容器会给每个请求分配一个线程,这个多线程会并发执行请求对应的业务逻辑,如果逻辑中有对应该单例状态的修改（存在成员变量可修改的）,则必须考虑线程同步问题

## Spring中事务失效的情况
1. 异常捕获处理,自己处理了异常，没有抛出导致事务失效
2. 抛出异常检查异常,配置rollbackfor属性为Exception
3. 非public方法导致的事务失效

## Spring bean的生命周期
1. 通过BeanDefinition获取bean的定义信息
2. 调用构造器函数实例化bean
3. bean的依赖注入
4. 处理Aware接口（BeanNameAware,BeanFactoryAware,ApplicationContextAware）
5. Bean的后置处理器BeanPostProcessor-前置处理
6. 初始化方法（InitializingBean,init-method）
7. Bean的后置处理器BeanPostProcessor-后置处理
8. 销毁bean

## Spring的循环依赖
三级缓存解决循环依赖,也可以说是依赖3个map变量来实现的

1. 一级缓存 单例池
2. 二级缓存 缓存早期bean对象（生命周期没有走完的）
3. 三级缓存 缓存的是ObjectFactory,表示对象工厂,用例创建某个对象


实例化对象A->先为原始对象A生成一个对象工厂->存放在三级缓存中

然后执行依赖注入B->如果B在单例池中不存在->则实例化B->先为原始对象B生成一个对象工厂->存放在三级缓存中

实例化B执行依赖注入A->通过对象工厂发现实例化A->实例化工厂会先把未完成初始化的对象暂存在二级缓存->然后将A的代理对象注入到B->B创建成功

然后将B在注入到A->A也创建成功

## Spring mvc执行流程
> jsp视图流程
1. 用户发送请求到前端控制器DispatcherServlet
2. DispatcherServlet收到请求后调用HandlerMapping(处理器映射器)
3. HandlerMapping找到具体的处理器,生成处理器对象及处理器拦截器（如果有),在一起返回给DispatchServlet
4. DispatcherServlet调用HandlerAdapter(处理器适配器)
5. HandlerAdapter经过适配调用具体的处理器(Handler/Controller)
6. Controller执行完成返回ModelAndView对象
7. HandlerAdapter将Controller执行结果ModelAndView返回给DispatcherServlet
8. DispatcherServlet将ModelAndView传给ViewResolver(视图解析器)
9. ViewResolver解析返回具体View(视图)
10. DispatcherServlet根据View进行渲染（将模型数据填充到视图中）
11. DispatcherServlet返回响应

> json 返回流程
1. 用户发送请求到前端控制器DispatcherServlet
2. DispatcherServlet收到请求后调用HandlerMapping(处理器映射器)
3. HandlerMapping找到具体的处理器,生成处理器对象及处理器拦截器（如果有),在一起返回给DispatchServlet
4. DispatcherServlet调用HandlerAdapter(处理器适配器)
5. HandlerAdapter经过适配调用具体的处理器(Handler/Controller)
6. 如果Controller上有注解 @ResponseBody
7. 通过HttpMessageConverter将返回处理结果为JSON并响应

## Springboot自动配置原理
自动装配类和条件注解：Spring Boot使用自动装配类和条件注解来实现自动配置。例如，@SpringBootApplication注解是一个复合注解，它包括@SpringBootConfiguration、@EnableAutoConfiguration和@ComponentScan等子注解。其中，@EnableAutoConfiguration注解用于开启自动配置功能，并利用AutoConfigurationImportSelector给容器中导入一些组件。这些组件会根据条件注解（如@ConditionalOnClass、@ConditionalOnProperty等）进行条件化装配。
在自动配置过程中，Spring Boot会扫描类路径下的“META-INF/spring.factories”文件，获取候选的配置。这些文件中包含了各种EnableAutoConfiguration的值，Spring Boot会将这些值加入到容器中，从而完成自动配置过程。
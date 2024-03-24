## Mybatis的执行流程
- 加载配置文件 通过SqlSessionFactoryBuilder加载配置文件
- 构建SqlSessionFactory
- 创建会话 SqlSession 
- Executor (操作数据库接口,负责查询缓存维护)
- MapperStatement （封装了映射信息）
- 输入参数映射
- 输出结果映射

## Mybatis 是否支持延迟加载
1. 延时加载顾名思义就是需要用到数据时才加载,不需要用到数据时不加载
2. Mybatis支持1对1关联对象和1对多关联集合的延迟加载
3. Mybatis配置文件中,可以配置是否启用延迟加载,默认是关闭的

## Mybatis 延迟加载原理
1. 通过CGLIB创建目标对象的代理对象
2. 当调用方法时,进入拦截器invoke方法,发现目标方法是null值,执行sql查询
3. 获取数据以后,调用set方法设置属性值,在查询目标方法就有值了

## Mybatis一级缓存和二级缓存


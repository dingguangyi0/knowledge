## Redis单机

## Redis主从复制
单节点Redis的并发能力有上限,要进一步提升Redis的并发能力,就需要搭建主从集群,实现读写分离,一般都是一主多从,主节点负责写数据,从节点负责读数据

### 主从全量同步
1. slave(从节点) 执行replicaof命令建立连接
2. slave(从节点) 请求同步数据（携带replica id,offset）
3. master判断是否是第一次同步 （判断replica id是否一致）
4. 是第一次,返回master的replica id和offset给salve(从节点)
5. slave(从节点)保存版本信息
6. master同步执行bgsave,生成RDB (bgsave期间的请求命令会记录在repl_baklog)
7. 发送RDB文件给slave
8. 清空本地数据,加载RDB
9. 发送repl_baklog中的命令给slave
10. slave执行接受的命令

**replica id**
简称replid,数据集的标识,主从id一致则说明是同一数据集,每个master都有一个唯一的replid,slave则会继承master节点的replid

**offset**
偏移量,随着记录在repl_baklog的数据增多而逐渐增大,slave完成同步时会记录当前同步的offset,如果offset小于master的offset,说明slave数据落后master,需要更新
### 主从增量同步
1. slave重启后,
2. 发送pysnc replid offset
3. 判断请求replid是否一致
4. 不是第一次,回复continue
5. 去repl_baklog中获取offset的数据
6. 发送offset后的命令给slave
7. slave执行命令

## 哨兵模式
主从集群模式可以解决并发能力,但是解决不了高可用问题,Redis提供了哨兵机制,来实现主从集群的自动故障恢复,哨兵的结构和作用如下
- 监控 哨兵会不断检测master和slave是否按照预期工作
- 自动故障恢复 如果master故障,哨兵会将一个slave提升为master,当故障实例恢复后也以新的master为主
- 通知 哨兵充当Redis客户端的服务发现来源,当集群发生故障转移时,会将最新信息推送给Redis客户端

哨兵基于心跳监测服务状态,每隔1秒向集群每个实例发送ping命令
- 主观下线 如果某个哨兵节点发现集群中某个实例在规定时间没有响应,则认为该实例主观下线
- 客观下线 若超过指定数量（quorum）的哨兵都认为该实例下线,则该实例客观下线,quorum值最后超过哨兵实例数量的一半

哨兵选主规则
1. 首先判断主从节点断开时间长短,如果从节点断开时间超过指定时间则排除该从节点
2. 然后判断从节点的优先级的值,优先级值越小优先级越高
3. 如果优先级值一致,则判断从节点offset值的大小,offset值越大优先级越高
4. 最后判断从节点运行id大小,越小优先级越高

集群（哨兵模式）脑裂

脑裂问题是,因为网络或其他原因,哨兵认为原来主节点已经客观下线,哨兵重新选择了主节点,这个时间redis客户单还可以向老的主节点写数据,当哨兵选主成功后，将老主节点改为从节点后,这期间redis客户端写的数据会丢失的
- min-replicas-to-write 1 表示最少的slave节点为1个
- min-replicas-max-log 5 表示数据复制和同步的延迟不能超过5秒
主服务器在从节点min-replicas-to-write大于等于这个值,并且从服务器与主服务器最后一次成功通信间隔时间不超过min-replicas-max-log时，才能写数据

以上配置只能尽量减少脑裂情况，无法完全避免

## 分片集群
主从和哨兵可以解决高可用和高并发读的问题,但是解决不了海里数据存储问题,高并发写的问题

分片集群特征
- 集群中有多个master,每个master保存不同数据
- 每个master都可以有多个slave节点
- master之间通过ping监测彼此监控状态
- 客户端请求可以访问集群任意节点,最终都会转发到正确节点

Redis分配集群引入了哈希槽的概念,Redis集群16384个哈希槽,每个key通过CRC16校验后对16384取模来决定放置在哪个槽中,集群的每个节点负责一部分hash槽

**为什么是16384**
因为是折中的选择,16384集群通信数据会更少而且也够用了

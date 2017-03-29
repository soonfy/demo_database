# elasticsearch

## 基础  
1. 启动  
  ```
  // 修改集群，节点名称
  ./bin/elasticsearch --cluster.name my_cluster_name --node.name my_node_name
  // 开启守护进程
  ./bin/elasticsearch -d
  // 修改PID
  ./bin/elasticsearch -p pid
  ```

2. 目录  
> home, 这是Elasticsearch解压的目录  
> bin, 这里面是ES启动的脚本  
> conf, elasticsearch.yml为ES的配置文件  
> data, 这里是ES得当前节点的分片的数据，可以直接拷贝到其他的节点进行使用  
> logs, 日志文件  
> plugins, 这里存放一些常用的插件，如果有一切额外的插件，可以放在这里使用  

3. 元数据  
> _index, 文档存放位置，类似一级分类。索引名必须小写，不能以下划线开头，不能包含逗号  
> _type, 文档的对象类别，类似二级分类。类型名可以是大写或者小写，不能以下划线或者句号开头，不应该包含逗号， 并且长度限制为256个字符  
> _id, 文档唯一标识。自己提供的 _id ，或者 Elasticsearch 自动生成  
> _version, 文档版本  
> _source, 文档内容  

4. 索引  
> 存储文档到 Elasticsearch 的行为叫做 索引  
  ```
  // 自定义 id 索引
  put /${index}/${type}/${id} ${body}
  // elasticsearch 自动生成 id
  post /${index}/${type}/ ${body}
  ```

5. 检索  
> 检索返回文档  
  ```
  // 根据 index, type, id 检索数据, pretty 打印
  get /${index}/${type}/${id}?pretty
  // 返回结果的指定字段, fields 以逗号分隔
  get /${index}/${type}/${id}?_source=fields
  // 只返回文档内容元数据
  get /${index}/${type}/${id}?_source
  ```

6. 检测  
> 检测文档是否存在  
  ```
  // 检测 index, type, id 文档是否存在
  head /${index}/${type}/${id}
  ```

7. 更新  
> elasticsearch 文档是不能改变的。更新文档，只能重新 index 或者替换文档  
  ```
  // 根据 index, type, id 更新文档
  PUT /${index}/${type}/${id}
  ```

8. 创建  
> 创建新文档，而不是在已有文档更新  
  ```
  // post 请求自动生成 id
  post /${index}/${type}/ ${body}
  // 设置 op_type 参数等于 create
  PUT /${index}/${type}/${id}?op_type=create
  // url末尾添加 /_create
  PUT /${index}/${type}/${id}/_create
  ```

9. 删除  
> 删除文档  
  ```
  // delete 删除文档
  delete /${index}/${type}/${id}
  ```

10. 冲突  
> 悲观并发控制. 这种方法被关系型数据库广泛使用，它假定有变更冲突可能发生，因此阻塞访问资源以防止冲突。 一个典型的例子是读取一行数据之前先将其锁住，确保只有放置锁的线程能够对这行数据进行修改  
> 乐观并发控制. Elasticsearch 中使用的这种方法假定冲突是不可能发生的，并且不会阻塞正在尝试的操作。 然而，如果源数据在读写当中被修改，更新将会失败。应用程序接下来将决定该如何解决冲突  

11. 部分更新  
> update, 检索-修改-删除旧索引-重建索引  
  ```
  // post 请求 url 末尾添加 _update 参数
  post /${index}/${type}/${id}/_update {doc: ${body}}
  // 脚本更新, 更新脚本中称为 ctx._source 参数
  post /${index}/${type}/${id}/_update {script: ctx._source[${attr}] += ${value}}
  // 更新文档不存在就新建, upsert 参数
  post /${index}/${type}/${id}/_update {script: ctx._source[${attr}] += ${value}, upsert: ${attr: value}}
  // 更新冲突重试, retry_on_conflict 参数
  post /${index}/${type}/${id}/_update?retry_on_conflict=5 {doc: ${body}}
  ```

12. 检索多个文档  
> 检索  
  ```
  // get 请求 url 末尾添加 _mget 参数
  get /_mget {docs: ${body}}
  // 合并相同的 index, type
  get /${index}/${type}/_mget {docs: ${body}}
  ```

13. 批量操作  
> 单个步骤执行多种请求, 每个子请求都是独立执行，因此某个子请求的失败不会对其他子请求的成功与否造成影响  
  ```
  // get 请求 url 末尾添加 _bulk 参数, action 是请求 create, update, index, delete. metadata 是文档
  get /_bulk {${action}: ${metadata}}
  // 合并相同的 index, type
  get /${index}/${type}/_mget {${action}: ${metadata}}
  ```

14. 搜索  
> mapping，映射，描述数据在每个字段内如何存储  
> analysis，分析，全文是如何处理使之可以被搜索的  
> Query DSL，领域特定查询语言，Elasticsearch 中强大灵活的查询语言  

15. 空搜索  
> 没有条件搜索，返回所有文档  
  ```
  // get 请求 url 末尾添加 _search参数
  // get /_search
  // 返回结果包含 hits, took, shards, timeout
  hits, total 代表匹配到的文档总数， hits 代表前10条文档， max_score 最高评分
  took, 请求耗费时间
  shards, 搜索条件中使用的分片总数
  timeout, 超时，超时返回已经返回的结果
  ```

16. 多索引，多类型搜索  
> 一个或多个特殊的索引并且在一个或者多个特殊的类型中进行搜索  
  ```
  // get 请求 url 设置多个索引，多个类型
  get /_search
  get /index1/_search
  get /index1,index2/_search
  get /index/type/_search
  get /index1,index2/type1,type2/_search
  // 所有索引的 type1, type2
  get /all/type1,type2/_search
  ```

## 常用技巧

1. 分词  
  ```
  http://localhost:9200/_analyze?analyzer=standard&pretty=true&text=soonfy胡歌
  ```

2. 
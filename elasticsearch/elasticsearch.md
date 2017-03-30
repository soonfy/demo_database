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

## 分布式存储  

1. 索引  
> 存储文档到 Elasticsearch 的行为叫做 索引  
  ```
  // 自定义 id 索引
  put /${index}/${type}/${id} ${body}
  // elasticsearch 自动生成 id
  post /${index}/${type}/ ${body}
  ```

2. 检索  
> 检索返回文档  
  ```
  // 根据 index, type, id 检索数据, pretty 打印
  get /${index}/${type}/${id}?pretty
  // 返回结果的指定字段, fields 以逗号分隔
  get /${index}/${type}/${id}?_source=fields
  // 只返回文档内容元数据
  get /${index}/${type}/${id}?_source
  ```

3. 检测  
> 检测文档是否存在  
  ```
  // 检测 index, type, id 文档是否存在
  head /${index}/${type}/${id}
  ```

4. 更新  
> elasticsearch 文档是不能改变的。更新文档，只能重新 index 或者替换文档  
  ```
  // 根据 index, type, id 更新文档
  PUT /${index}/${type}/${id}
  ```

5. 创建  
> 创建新文档，而不是在已有文档更新  
  ```
  // post 请求自动生成 id
  post /${index}/${type}/ ${body}
  // 设置 op_type 参数等于 create
  PUT /${index}/${type}/${id}?op_type=create
  // url末尾添加 /_create
  PUT /${index}/${type}/${id}/_create
  ```

6. 删除  
> 删除文档  
  ```
  // delete 删除文档
  delete /${index}/${type}/${id}
  ```

7. 冲突  
> 悲观并发控制. 这种方法被关系型数据库广泛使用，它假定有变更冲突可能发生，因此阻塞访问资源以防止冲突。 一个典型的例子是读取一行数据之前先将其锁住，确保只有放置锁的线程能够对这行数据进行修改  
> 乐观并发控制. Elasticsearch 中使用的这种方法假定冲突是不可能发生的，并且不会阻塞正在尝试的操作。 然而，如果源数据在读写当中被修改，更新将会失败。应用程序接下来将决定该如何解决冲突  

8. 部分更新  
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

9. 检索多个文档  
> 检索  
  ```
  // get 请求 url 末尾添加 _mget 参数
  get /_mget {docs: ${body}}
  // 合并相同的 index, type
  get /${index}/${type}/_mget {docs: ${body}}
  ```

10. 批量操作  
> 单个步骤执行多种请求, 每个子请求都是独立执行，因此某个子请求的失败不会对其他子请求的成功与否造成影响  
  ```
  // get 请求 url 末尾添加 _bulk 参数, action 是请求 create, update, index, delete. metadata 是文档
  get /_bulk {${action}: ${metadata}}
  // 合并相同的 index, type
  get /${index}/${type}/_mget {${action}: ${metadata}}
  ```

## 搜索  

1. 搜索  
> mapping，映射，描述数据在每个字段内如何存储  
> analysis，分析，全文是如何处理使之可以被搜索的  
> Query DSL，领域特定查询语言，Elasticsearch 中强大灵活的查询语言  

2. 空搜索  
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

3. 多索引，多类型搜索  
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

4. 分页  
> size, 返回结果数量. from, 跳过的结果数量  
  ```
  // get 请求 url 添加查询条件size, from
  get /_search?size=5&from=5
  ```

5. 轻量搜索  
> 特定字段搜索，q 参数设置字段和条件. 全字段搜索，q 参数只设置条件.   
  ```
  // 特定字段，get 请求 url 添加查询条件q
  get /_search?q=${field}:${value}
  get /_search?q=+${field}:${value} +${field}:${value}
  // 全字段
  get /_search?q=${value}
  ```

## 映射与分析  

1. 映射  
> elasticsearch 核心数据类型 strings, numbers, Booleans, dates 索引类型不同，_all 是 string 类型。  
> 精确值，核心数据类型，返回匹配或者不匹配。全文，文本数据，返回匹配程度。  

2. 倒排索引  
> 一个倒排索引由文档中所有不重复词的列表构成，对于其中每个词，有一个包含它的文档列表。  
> 索引文本和查询字符串必须标准化为相同的格式。  

3. 分析与分析器  
> 分析过程。将文本分成适合于倒排索引的独立的词条.将这些词条统一化为标准格式以提高它们的“可搜索性”.  
> 分析器功能。字符过滤器，在分词前整理字符串。分词器，字符串分为单个的词条。Token过滤器，改变词条，删除词条，增加词条。  
> 分析器。标准分析器，根据单词边界划分文本，删除绝大部分标点，将词条小写。简单分析器在任何不是字母的地方分隔文本，将词条小写。空格分析器，在空格的地方划分文本。特定语言分析器，考虑指定语言的特点。  

4. 简单域映射  
> 简单域映射。字符串，string。整数，byte, short, integer, long。浮点数，float, double。布尔型，boolean。日期，date。  
> 查看域映射  
  ```
  // get _mapping
  get /${index}/_mapping/${type}
  ```

> 测试映射  
  ```
  // get _analyze
  get /${index}/_analyze ${body}
  ```

> 自定义映射。非string域设置type属性。string域设置index，analyzer  
> index属性指定索引类型。index设置analyzed，全文索引。index设置not-analyzed，精确索引。index设置no，不索引，查询不到。string域index属性默认是analyzed  
> analyzer属性指定在搜索和索引时使用的分析器。默认使用standard分析器，whitespace，simple，english  
> 更新映射。可以增加一个存在的映射，你不能修改存在的域映射。更新一个映射来添加一个新域，但不能将一个存在的域从analyzed改为not_analyzed  

5. 复杂域映射  
> 多值域，数组。数组中所有的值必须是相同数据类型的。数组是以多值域索引的—可以搜索，但是无序的  
> 空域，null, [], [null]。不会被索引  
> 多层级对象，对象。Lucene不理解内部对象。Lucene文档是由一组键值对列表组成的。内部域可以通过名称引用，使用全路径或type名加路径  
> 内部对象数组。扁平化会丢失对象属性直接的相关性  

## 请求体查询  

1. 请求体查询  
> 查询参数是通过Http请求体而非查询字符串来传递的。  
> 空查询，返回所有索引库（indices)中的所有文档  
> 查询表达式，将查询语句传递给query参数  
  ```
  get /_search {query: ${value}}
  // 查询语句结构
  {
    QUERY_NAME: {
      ARGUMENT: VALUE,
      ARGUMENT: VALUE,...
    }
  }
  // 特定字段的查询语句
  {
    QUERY_NAME: {
        FIELD_NAME: {
          ARGUMENT: VALUE,
          ARGUMENT: VALUE,...
        }
    }
  }
  ```

> 查询语句(Query clauses)。叶子语句（Leaf clauses），复合(Compound) 语句  

2. 查询  
> 查询组件。过滤情况（filtering context）查询被设置成一个“不评分”或者“过滤”查询。查询情况（query context）查询就变成了一个“评分”的查询。  
> 过滤查询（Filtering queries）检查包含或者排除，计算非常快，缓存到内存。评分查询（scoring queries）找出匹配的文档，计算文档相关性，查询结果不缓存。  

3. 常用查询  
> match_all查询，匹配所有文档  
> match查询，标准查询，自动使用精确查询或者全文查询  
> multi_match查询，在多个字段上执行相同的match查询  
> range查询，在指定区间内的数字或者时间，gt，gte，lt，lte  
> term查询，精确值匹配  
> terms查询，指定多值进行匹配。对于输入的文本不分析，匹配指定值中的任何一个值，这个文档满足条件  
> exists查询，missing查询，查找指定字段中有值 (exists) 或无值 (missing) 的文档  

4. 组合查询  
> bool查询。接收参数must，必须匹配这些条件。must_not，必须不匹配这些条件。should，满足这些语句中的任意语句，将增加相关性。filter必须匹配，但它以不评分、过滤模式来进行  
> constant_score查询。取代只有filter语句的bool查询  
> 验证查询。validate-query验证查询是否有效  
  ```
  // get 请求url添加_validate和explain参数
  get /${index}/${type}/_validate/query?explain ${body}
  ```

## 排序与相关性  

1. 排序  
> 默认返回的结果是按照相关性进行排序。相关性得分由一个浮点数进行表示，并在搜索结果中通过 _score参数返回，默认排序是 _score降序  
> 按照字段值进行排序。使用 sort参数，_score和 max_score字段都是 null。无论如何你都要计算 _score，你可以将track_scores参数设置为true  
> 多级排序。sort参数传递一个排序数组  
> 字段的多值排序。将多值字段减为单值，这可以通过使用 min 、 max 、 avg 或是 sum 排序模式  
> 字符串排序。字符串字段排序应仅包含一项，整个 not_analyzed 字符串。所有的简单类型 (strings, numbers, Booleans, dates) 接收一个 fields 参数该参数允转化一个简单的映射  

2. 相关性  
> 相关性评分，用一个正浮点数字段 _score 来表示 。 _score 的评分越高，相关性越高  
> fuzzy 查询会计算与关键词的拼写相似程度，terms 查询会计算 找到的内容与关键词组成部分匹配的百分比  
> 相似度算法，被定义为检索词频率/反向文档频率， TF/IDF。检索词频率，反向文档频率，字段长度准则  
> 理解相关性评分，explain 参数  
  ```
  get /_search?explain ${body}
  ```

> 理解文档匹配，explain 参数  
  ```
  get /${index}/${type}/${id}/_explain
  ```

> doc values 就是一种列式存储结构，排序发生在索引时建立的平行数据结构中  

## 分布式检索  
> 当一个搜索请求被发送到某个节点时，这个节点就变成了协调节点。 这个节点的任务是广播查询请求到所有相关分片并将它们的响应整合成全局排序后的结果集合，这个结果集合会返回给客户端  
> 分成2阶段。查询阶段，取回阶段  
> 检索选项。preference参数，控制由哪些分片或节点来处理搜索请求。timeout参数，超时返回检索到的部分数据。routing参数，限定只搜索几个相关的分片。search_type参数，指定检索类型  
> 游标查询。取查询初始化之后的快照数据。 游标查询用字段 _doc 来排序。scroll参数指定游标查询的过期时间，size参数指定单个分片返回文档数量  
  ```
  get /${index}/scroll=1m ${body}
  ```

> 游标查询每次返回一个新字段_ scroll_ id。下一次游标查询，必须把前一次查询返回的字段 _ scroll_id 传递进去  

## 索引管理  

1. 创建索引  
> 索引一篇文档创建了一个新的索引。这个索引采用的是默认的配置，新的字段通过动态映射的方式被添加到类型映射  
> 手动创建索引，在请求体传入设置或类型映射  
> 禁止自动创建索引。在 config/elasticsearch.yml 的每个节点下添加下面的配置，action.auto_ create_index: false  

2. 删除索引  
> delete 请求  
  ```
  delete /index
  delete /index1,index2
  delete /index*
  delete /_all
  delete /*
  ```

> 禁止单个命令删除所有数据。删除只限于特定名称指向的数据，在 config/elasticsearch.yml 添加下面的配置，action.destructive_ requires_name: true  

3. 索引设置  
> number_ of_shards。每个索引的主分片数，默认值是 5 。这个配置在索引创建后不能修改  
> number_ of_replicas。每个主分片的副本数，默认值是 1 。对于活动的索引库，这个配置可以随时修改  
> update_ index_settings参数动态修改副本数  
  ```
  put /${index}/_settings {update_index_settings: ${value}}
  ```

4. 配置分析器  
> standard 分词器，通过单词边界分割输入的文本。standard 语汇单元过滤器，目的是整理分词器触发的语汇单元。lowercase 语汇单元过滤器，转换所有的语汇单元为小写。stop 语汇单元过滤器，删除停用词  
> 自定义分析器  
  ```
  put /index {
    settings: {
      analysis: {
        char_filter: {},
        tokenizer: {},
        filter: {},
        analyzer: {}
      }
    }
  }
  ```

5. 类型与映射  
> Lucene 没有文档类型的概念，每个文档的类型名被存储在 _type 的元数据字段上  
> Lucene 也没有映射的概念。 映射是 Elasticsearch 将复杂JSON文档映射成 Lucene 需要的扁平化数据的方式  
> 同个索引，不同类型的相同字段的映射必须相同。同个索引，有两个不同的类型，每个类型都有同名的字段，但映射不同，Elasticsearch会出现异常  
> 同个索引的多个不同类型，后台 Lucene 将创建一个映射  
> 在不同的细分中数据的整体模式是相似的。两个类型的字段集是互不相同的，最好是使用两个单独的索引  

6. 根对象  
> 映射的最高一层被称为根对象。属性节点，元数据字段，设置项，其它设置  
> 属性节点配置。type，index，analyzer  
> 元数据。_source 字段，存储代表文档体的JSON字符串。 _all 字段，把其它字段值当作一个字符串来索引的特殊字段。  
> _id字段，文档的 ID 字符串。 _type字段，文档类型名。 _index字段，文档索引名。 _uid， _type 和 _id 连接在一起构造成 type#id  

7. 动态映射  
> 索引文档中没有的字段，动态映射会确定字段的数据类型并自动把新的字段添加到类型映射  
> dynamic 字段配置。默认true，映射新字段。false，忽略新字段。strict，索引新字段抛错  
> dynamic 设置 false 不会改变 _source 的字段内容。 _source 包含被索引的整个JSON文档，只是新的字段不会被加到映射中也不可搜索  
> 动态模板。通过字段名称或数据类型来应用不同的映射  

8. 缺省映射  
> 一个索引中的所有类型共享相同的字段和设置。 _default _ 字段映射指定通用设置  

9. 重新索引  
> 可以增加新的类型到索引，可以增加新的字段到类型，不能添加新的分析器或者对现有的字段做改动  
> 重新索引。用新的设置创建新的索引并把文档从旧的索引复制到新的索引  

10. 索引别名  
> 管理别名。 _alias 用于单个操作， _aliases 用于执行多个原子级操作  
  ```
  // 设置index 别名指向index1
  put /index1/_alias/index
  ```

## 搜索  

1. 结构话搜索  
> 结构化搜索（Structured search） 是指有关探询那些具有内在结构数据的过程
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 
> 

## 常用技巧  

1. 分词  
  ```
  http://localhost:9200/_analyze?analyzer=standard&pretty=true&text=soonfy胡歌
  ```

2. 

## JavaScript API  

1. client.bulk([params, [callback]])  
> 在单个批量请求中执行多个创建、索引、删除和更新请求  

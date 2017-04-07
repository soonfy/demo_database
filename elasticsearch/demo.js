const elasticsearch = require('elasticsearch');

console.log(process.argv);

let client = new elasticsearch.Client({
  hosts: [{
    host: 'localhost',
    port: '9200',
    country: 'zh-cn'
  }],
  // httpAuth: 'user:pass',
  log: [{
    type: 'stream',
    level: 'error',
    stream: process.stdout
  }, {
    type: 'file',
    level: 'trace',
    path: './logs/elasticsearch.log'
  }],
  // sniffOnStart: true,
  // sniffInterval: 1000 * 60,
  // sniffOnConnectionFault: true,
  // maxRetries: 10,
  // requestTimeout: 1000 * 60,
  // deadTimeout: 1000 * 60,
  // pingTimeout: 1000 * 10,
  // apiVersion: '5.x'
});

// client.ping()检测链接
// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch ping error.');
//   } else {
//     console.log('elasticsearch ping suc.');
//   }
// });

// client.index()根据index/type/id索引数据
// client.index({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 2,
//   body: {
//     name: 'soonfy',
//     age: Math.floor(Math.random() * 20)
//   }
// }, function (error, res) {
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch index error.');
//   } else {
//     console.log(res);
//   }
// });

// client.get()根据index/type/id查找数据
// client.get({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 'AVsYoNVRHszQBkcQbQqu',
//   ignore: [404]
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch get error.');
//   } else {
//     console.log(data);
//   }
// });

// client.search()检索所有
// client.search({}, function (error, data) {
//   if (error) {
//     console.error(error);
//     console.error('search error.');
//   } else {
//     console.log(data.hits);
//     console.log(data.hits.hits);
//   }
// })

// client.search()检索
// client.search({
//   q: 'name:soonfy'
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     return console.error('search error.');
//   } else {
//     console.log(data.hits);
//   }
// })

// client.delete()根据id删除一个文档
// client.delete({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1
// }, (error, resp, status) => {
//   if (error) {
//     console.error(error);
//     return console.error('delete error');
//   } else {
//     console.log(resp);
//     console.log(status);
//   }
// })

// client.bulk()一个请求多个操作
// client.bulk({
//   body: [
//     {
//       index: {
//         _index: 'idemo',
//         _type: 'tdemo',
//         _id: 1
//       }
//     }, {
//       title: 'soonfy'
//     }, {
//       update: {
//         _index: 'idemo',
//         _type: 'tdemo',
//         _id: 1
//       }
//     }, {
//       doc: {
//         title: 'soonfy'
//       }
//     },
//     {
//       delete: {
//         _index: 'idemo',
//         _type: 'tdemo',
//         _id: 1
//       }
//     }
//   ]
// }, (error, resp, status) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(resp);
//     console.log(status);
//     let items = resp.items;
//     items.map(x => {
//       console.log(x);
//     })
//   }
// })

// client.count()统计
// client.count({
//   index: 'idemo',
//   type: 'tdemo',
//   body: {
//     query: {
//       match: {
//         name: 'soonfy'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch count error.');
//   } else {
//     console.log(resp);
//     console.log(status);
//   }
// })

// client.count({}, (error, resp) => {
//   console.log(resp);
// })

// client.create()索引一个文档
// client.create({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 5,
//   body: {
//     text: '中华人民共和国是祖国',
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.log('elasticsearch create error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.deleteByQuery()根据条件删除
// client.deleteByQuery({
//   index: 'idemo',
//   type: 'tdemo',
//   body: {
//     query: {
//       term: {
//         name: 'soonfy'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch delete by query error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.exists()根据index/type/id判断
// client.exists({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1,
//   body: {
//     query: {
//       term: {
//         name: 'soonfy'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch exists error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.explain()解释文档评分
// client.explain({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1,
//   body: {
//     query: {
//       term: {
//         name: 'soonfy'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch explain error.');
//   } else {
//     console.log(resp);
//     console.log(resp.explanation);
//   }
// })

// client.get()根据id检索一个文档
// client.get({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch get error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.info()显示集群信息
// client.info({
//   // 
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch info error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.mget()检索多个文档
// client.mget({
//   index: 'idemo',
//   type: 'tdemo',
//   body: {
//     // ids: [1, 2],
//     docs: [{
//       _id: 1
//     }, {
//       _id: 2
//     }]
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch mget error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.msearch()一个请求多个查询
// client.msearch({
//   body: [
//     // 查询1：匹配 + 过滤
//     {
//       name: 'soonfy'
//     }, {
//       query: {
//         term: {
//           _id: 1
//         }
//       }
//     },
//     // 查询2：匹配 + 过滤
//     {
//       name: 'soonfy'
//     }, {
//       query: {
//         term: {
//           _id: 2
//         }
//       }
//     }
//   ]
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch msearch error.');
//   } else {
//     console.log(resp);
//     console.log(resp.responses[0].hits);
//   }
// })

// client.search({
//   index: 'idemo',
//   type: 'tdemo',
//   // scroll: '30s',
//   // source: ['name'],
//   q: 'name:soonfy'
// }, function getMore(error, resp, status) {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch search error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.suggest()推荐关键词
// client.suggest({
//   index: 'idemo',
//   // type: 'tdemo',
//   body: {
//     suggester: {
//       text: 'soonffy',
//       term: {
//         field: 'name'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch suggest error.');
//   } else {
//     console.log(resp);
//     console.log(resp.suggester[0]);
//   }
// })

// client.update()更新文档内容
// client.update({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1,
//   body: {
//     doc: {
//       sex: 'woman'
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//     return console.error('elasticsearch update error.');
//   } else {
//     console.log(resp);
//   }
// })

// client.search({
//   index: 'idemo',
//   type: 'tdemo'
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(resp);
//     console.log(resp.hits.hits);
//   }
// })

// client.search({
//   index: 'idemo',
//   type: 'tdemo',
//   body: {
//     query: {
//       match: {
//         text: '中国'
//       }
//     }
//   }
// }, (error, resp, status) => {
//   console.log(status);
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(resp);
//     console.log(resp.hits.hits);
//   }
// })
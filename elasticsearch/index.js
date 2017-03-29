const elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error(error);
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// client.index({
//   index: 'idemo',
//   type: 'tdemo',
//   body: {
//     name: 'soonfy',
//     age: Math.floor(Math.random() * 20)
//   }
// }, function (error, res) {
//   if (error) {
//     console.error(error);
//     console.error('elasticsearch index error.');
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
//     console.error('elasticsearch get error.');
//   } else {
//     console.log(data);
//   }
// });

// client.search()全属性匹配
// client.search({
//   q: 'soonfy'
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     console.error('search error.');
//   } else {
//     console.log(data.hits);
//   }
// })

// client.search({
//   q: 'name:soonfy'
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     console.error('search error.');
//   } else {
//     console.log(data.hits);
//   }
// })

// client.delete({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 'AVsYoNVRHszQBkcQbQqu'
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     console.error('delete error');
//   } else {
//     console.log(data);
//   }
// })
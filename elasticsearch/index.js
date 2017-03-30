const elasticsearch = require('elasticsearch');

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

// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error(error);
//     console.error('elasticsearch ping error.');
//   } else {
//     console.log('elasticsearch ping suc.');
//   }
// });

// client.index({
//   index: 'idemo',
//   type: 'tdemo',
//   id: 1,
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

// client.search()检索所有索引
// client.search({
// }, function (error, data) {
//   if (error) {
//     console.error(error);
//     console.error('search error.');
//   } else {
//     console.log(data.hits);
//   }
// })

// client.search()检索指定字段值
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

client.bulk({
  body: [
    {
      index: {
        _index: 'idemo',
        _type: 'tdemo',
        _id: 1
      }
    }, {
      title: 'soonfy'
    }, {
      update: {
        _index: 'idemo',
        _type: 'tdemo',
        _id: 2
      }
    }, {
      doc: {
        title: 'soonfy'
      }
    }, {
      delete: {
        _index: 'idemo',
        _type: 'tdemo',
        _id: 1
      }
    }
  ]
}, (error, res) => {
  if (error) {
    console.error(error);
  } else {
    console.log(res);
    let items = res.items;
    items.map(x => {
      console.log(x);
    })
  }
})
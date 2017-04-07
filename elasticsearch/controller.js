const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  hosts: [{
    host: 'localhost',
    port: '9200',
    country: 'zh-cn'
  }],
  log: [{
    type: 'stream',
    level: 'error',
    stream: process.stdout
  }, {
    type: 'file',
    level: 'trace',
    path: './logs/elasticsearch.log'
  }]
});

const config = {
  index: 'index_name',
  type: 'type_name'
}

const create = (doc, cb) => {
  client.index({
    index: config.index,
    type: config.type,
    body: doc
  }, function (error, response) {
    if (error) {
      console.error(error);
      console.error(`[elasticsearch] create error.`);
      return cb(error);
    } else {
      console.log(`[elasticsearch] create success.`);
      cb(null, response);
    }
  });
}

const find = (doc, cb) => {
  client.search({
    // 
  }, function (error, response) {
    if (error) {
      console.error(error);
      console.error(`[elasticsearch] find error.`);
      return cb(error);
    } else {
      console.log(`[elasticsearch] find success.`);
      cb(null, response);
    }
  });
}

const update = (doc, cb) => {
  client.update({
    // 
  }, function (error, response) {
    if (error) {
      console.error(error);
      console.error(`[elasticsearch] find error.`);
      return cb(error);
    } else {
      console.log(`[elasticsearch] find success.`);
      cb(null, response);
    }
  });
}

module.exports = {
  create,
  find
}
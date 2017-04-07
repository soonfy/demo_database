const DataModel = require('./model');

const create = (doc, cb) => {
  DataModel.create(doc, (error, _doc) => {
    if (error) {
      console.error(`[mongodb] create error.`);
      cb(error);
    } else {
      console.log(`[mongodb] create success.`);
      cb(null, _doc);
    }
  });
}

const find = (doc, cb) => {
  DataModel.find({id: doc.id}, (error, _docs) => {
    if (error) {
      console.error(`[mongodb] find error.`);
      cb(error);
    } else {
      console.log(`[mongodb] find success.`);
      cb(null, _docs);
    }
  });
}

const update = (doc, cb) => {
  DataModel.update({ id: doc.id }, {$set: doc}, (error, _doc) => {
    if (error) {
      console.error(`[mongodb] update error.`);
      cb(error);
    } else {
      console.log(`[mongodb] update success.`);
      cb(null, _doc);
    }
  });
}

const remove = (doc, cb) => {
  DataModel.remove({id: doc.id}, (error) => {
    if (error) {
      console.error(`[mongodb] delete error.`);
      cb(error);
    } else {
      console.log(`[mongodb] delete success.`);
      cb(null, 'delete success.');
    }
  });
}

module.exports = {
  create,
  find,
  update,
  remove
}

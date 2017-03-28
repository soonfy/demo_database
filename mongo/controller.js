const DataModel = require('./model');

const create = (docs, cb) => {
  DataModel.create(docs, (err, _docs) => {
    if (err) {
      console.error(`[mongodb] create err.`);
      cb(err);
    } else {
      console.error(`[mongodb] create suc.`);
      cb(null, _docs);
    }
  });
}

const find = (doc, cb) => {
  DataModel.find({id: doc.id}, (err, _docs) => {
    if (err) {
      console.error(`[mongodb] find err.`);
      cb(err);
    } else {
      console.error(`[mongodb] find suc.`);
      cb(null, _docs);
    }
  });
}

const update = (doc, cb) => {
  DataModel.update({ id: doc.id }, {$set: doc}, (err, _doc) => {
    if (err) {
      console.error(`[mongodb] update err.`);
      cb(err);
    } else {
      console.error(`[mongodb] update suc.`);
      cb(null, _doc);
    }
  });
}

const remove = (doc, cb) => {
  DataModel.remove({id: doc.id}, (err) => {
    if (err) {
      console.error(`[mongodb] delete err.`);
      cb(err);
    } else {
      console.error(`[mongodb] delete suc.`);
      cb(null, 'delete suc.');
    }
  });
}

module.exports = {
  create,
  find,
  update,
  remove
}

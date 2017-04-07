const Controller = require('./controller');

const test = (actor, cb) => {
  let author = 'soonfy';
  let age = Math.floor(Math.random() * 100);
  let doc = {
    id: Math.random(),
    name: author + age,
    age
  };
  console.log(`elasticsearch...`);
  console.log(`[new doc] ->`);
  console.log(doc);
  switch (actor) {
    case 'create':
      Controller.create(doc, cb);
      break;
    case 'read':
      Controller.find(doc, cb);
      break;
    case 'update':
      Controller.update(doc, cb);
      break;
    case 'delete':
      Controller.remove(doc, cb);
      break;
    default:
      console.error(`actor ${actor} not find.`);
      cb();
      break;
  }
}

module.exports = test;

/**
 *  entry
 */

const mongo = require('./mongodb/index');
const elasticsearch = require('./elasticsearch/index');

const args = process.argv.slice(2);
console.log(args);
if (args.length < 1) {
  console.error(`请输入需要测试的操作类型。`);
  process.exit();
} else if(args.length < 2) {
  console.error(`请输入需要测试的数据库类型和操作类型。`);
  process.exit();
}

const db = args[0].trim();
const actor = args[1].trim();
console.log(`start test ${db} ${actor}.`);

const over = (db) => {
  return (error, doc) => {
    if (error) {
      console.error(error);
      console.error(`[${db}] test error.`);
    } else {
      console.log(doc);
      console.log(`[${db}] test over.`);
    }
    process.exit();
  }
}

switch (db) {
  case 'mongodb':
    mongo(actor, over(db));
    break;
  case 'elasticsearch':
    elasticsearch(actor, over(db));
    break;
  default:
    console.error(`[db] ${db} not find.`);
    break;
}
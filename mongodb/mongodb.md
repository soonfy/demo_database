# [mongodb](https://docs.mongodb.com/manual/reference/)  

> 基本CRUDI  
  ```
  db.collection.insertOne();
  db.collection.find();
  db.collection.update();
  db.collection.remove();
  db.collection.createIndex();
  ```

## [mongoose](https://github.com/Automattic/mongoose)  

> 基本CRUDI  
  ```
  mongoose.connect(db);
  Schema.index();
  Model = mongoose.model(Schema);
  Model.create(doc, func);
  Model.find(doc, func);
  Model.update(doc, func);
  Model.remove(doc, func);
  ```

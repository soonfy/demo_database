const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const DataSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    index: true
  },
  age: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// index
DataSchema.index({ name: 1, age: 1 });

// Model
const DataModel = mongoose.model('ModelName', DataSchema, 'collection_name');

// connect mongodb
mongoose.connect('mongodb://localhost/db_name');
// debug
mongoose.set('debug', true);

module.exports = DataModel;
const mongoose = require("mongoose");

//define Schema
const bookSchema = mongoose.Schema({
  name: String,
  author: String,
});

//create model
const bookSchemaModel = mongoose.model("books", bookSchema);

module.exports = {
  bookSchema,
};

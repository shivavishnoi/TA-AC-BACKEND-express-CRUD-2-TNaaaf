var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true, minLength: 4, maxLength: 20 },
  email: { type: String, required: true, minLength: 5 },
  country: { type: String, required: true },
  books: { type: [Schema.Types.ObjectId], ref: 'Book' },
});

module.exports = mongoose.model('Author', authorSchema);

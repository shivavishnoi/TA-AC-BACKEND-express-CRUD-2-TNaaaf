var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String },
    pages: { type: Number },
    publication: { type: String },
    cover: { type: String, required: true },
    category: { type: [String], required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', booksSchema);

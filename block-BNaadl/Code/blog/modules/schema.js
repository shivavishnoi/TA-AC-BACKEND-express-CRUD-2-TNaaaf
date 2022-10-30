var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  // tags: { type: [String] },
  author: { type: String },
  likes: { type: Number },
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;

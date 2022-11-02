var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: [Schema.Types.ObjectId], required: true, ref: 'Comment' },
    likes: { type: Number, default: 0 },
    author: { type: String },
  },
  { timestamps: true }
);

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;

var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Comment = require("../models/comments")

/* GET users listing. */
//display
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', { articles });
  });
});
router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    (err, updatedArticle) => {
      if (err) return next(err);
      res.redirect('/articles');
    }
  );
});
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id).populate('comments').exec((err, article)=>{
     if(err) return next(err);
     res.render("singleArticle", {article})
  })
  
});
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    if (err) return next(err);
    Comment.deleteMany({articleId: deletedArticle._id}, (err, comment)=>{
    if (err) return next(err);
      res.redirect('/articles');
    })
  });
});
router.get('/:id/update', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('updateArticle', { article });
  });
});
router.post('/:id/update', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, {new: true}, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles/"+ id);
  });
});
router.post("/:id/comments", (req, res, next)=>{
   var id = req.params.id;
   req.body.articleRef = id;
   Comment.create(req.body, (err, comment)=>{
     if(err) return next(err);
     Article.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err, article)=>{
     if(err) return next(err);
      res.redirect("/articles/"+id)
    })
   })
})

module.exports = router;

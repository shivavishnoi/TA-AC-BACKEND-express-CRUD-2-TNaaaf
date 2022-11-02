var express = require("express")
var router = express.Router();
var Comment = require("../models/comments")
var Article = require("../models/articles")

router.get("/:id/edit", (req, res, next)=>{
  var id = req.params.id
  Comment.findById(id, (err, comment)=>{
    if(err) return next(err)
    res.render("updateComment", {comment})
  })
})
router.get("/:id/delete", (req, res, next)=>{
  var id = req.params.id
  Comment.findByIdAndRemove(id, (err, comment)=>{
    if(err) return next(err)
    Article.findByIdAndUpdate(comment.articleRef, {$pull : {comments : comment._id}}, (err, article)=>{

      res.redirect("/articles/" + comment.articleRef)
    })
  })
})
router.post("/:id", (req, res, next)=>{
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, {new: true},(err, comment)=>{
    if(err) return next(err);

      res.redirect("/articles/" + comment.articleRef)
  })
})
module.exports = router;
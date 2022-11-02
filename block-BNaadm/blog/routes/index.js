var express = require('express');
var router = express.Router();
var Article = require('../models/articles');

/* GET home page. */
router.get('/articles/new', function (req, res, next) {
  res.render('newArticle');
});
router.post('/articles', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

module.exports = router;

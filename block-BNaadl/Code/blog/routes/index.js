var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/articles/new', function (req, res, next) {
  res.render('index');
});

module.exports = router;

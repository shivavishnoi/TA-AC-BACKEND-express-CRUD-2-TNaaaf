var express = require('express');
const { route } = require('.');
var router = express.Router();
var Author = require('../models/Author');
const Books = require('../models/Books');

router.post('/new', (req, res, next) => {
  Author.create(req.body, (err, author) => {
    if (err) return next(err);
    res.render('booksDetails', { author });
  });
});

router.get('/', (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render('allAuthors', { authors });
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Author.findById(id)
    .populate('books')
    .exec((err, author) => {
      if (err) return next(err);
      res.render('authorAndBooks', { author });
    });
});
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Author.findByIdAndDelete(id, (err, deletedAuthor) => {
    if (err) return next(err);
    Books.deleteMany({ authorId: deletedAuthor._id }, (err, deletedBook) => {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});
module.exports = router;

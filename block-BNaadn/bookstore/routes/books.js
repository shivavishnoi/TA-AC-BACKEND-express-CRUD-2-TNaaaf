var express = require('express');
var router = express.Router();
var Book = require('../models/Books');
var Author = require('../models/Author');

/* GET users listing. */
router.post('/:id', function (req, res, next) {
  var id = req.params.id;
  req.body.authorId = id;
  var catArr = req.body.categories.split(' ');
  req.body.category = catArr;
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    Author.findByIdAndUpdate(
      id,
      { $push: { books: book._id } },
      { new: true },
      (err, author) => {
        if (err) return next(err);
        res.render('bookSuccess', { author, book });
      }
    );
  });
});
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Author.findById(id, (err, author) => {
    res.render('booksDetails', { author });
  });
});
router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('allBooks', { books });
  });
});
router.get('/:id/show', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id)
    .populate('authorId')
    .exec((err, book) => {
      if (err) return next(err);
      res.render('booksAndAuthor', { book });
    });
});
router.get('/tag/:category', (req, res, next) => {
  var category = req.params.category;
  Book.find({ category: { $in: [category] } }, (err, books) => {
    if (err) return next(err);
    res.render('allBooks', { books });
  });
});
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) return next(err);
    res.redirect('/');
  });
});
module.exports = router;

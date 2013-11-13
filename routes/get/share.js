"use strict";

var path = require('path')
  , dbs = require(path.join(__dirname, '..', '..', 'db'));

module.exports = function (req, res, next) {
  dbs.categories.find({}, function (err, categories) { 
    console.log('res.locals.errors = ', res.locals.errors);
    res.render('share', {categories: categories});
  });
}

"use strict";

var path = require('path')
  , libDir = path.join(__dirname, '..', '..', 'lib')
  , dbs = require(path.join(__dirname, '..', '..', 'db'));

exports.add = function (req, res, next) {
  var category = req.body.category;

  if (category.name === 'name') {
    res.locals.errors = {caterror: 'category needs another name than name'};
    return res.redirect('/share');
  }

  dbs.categories.update({name: category.name}, category, {upsert: true}, function (err, dbCat) {
    res.redirect('/share');
  });
}

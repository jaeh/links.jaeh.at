"use strict";

var path = require('path')
  , rootDir = path.join(__dirname, '..', '..')
  , checkLink = require(path.join(rootDir, 'lib', 'checkLink'))
  , slugify = require(path.join(rootDir, 'lib', 'slugify'))
  , dbs = require(path.join(rootDir, 'db'));

module.exports = function (req, res, next) {
  //~ console.log('adding link = ',  req.body.link);

  if (req.body.link) {
    checkLink(req.body.link, function (errors, link) {

      //~ console.log('errors = ', errors);

      if (errors && errors.length > 0) {
        //~ console.log('returning res.render with errors');
        return res.render('share', {link: link, errors: errors});
      }

      link.date = new Date().getTime();

      dbs.links.insert(link, function (err, dbLink) {
        dbs.categories.find({}, function (err, categories) {
          //~ console.log('error = ' + err + ' links = ', dbLink);
          res.render('share', {link: dbLink, categories: categories});
        });
      });
    });

  } else if (req.body.category) {
    var category = req.body.category;

    if (category.name === 'name') {
      var error = 'category needs another name than name';
      return res.render('share', {caterror: error});
    }

    category.slug = slugify(req.body.category.name);

    category.date = new Date().getTime();

    dbs.categories.update({name: category.name}, category, {upsert: true}, function (err, dbCat) {
      dbs.categories.find({}, function (err, categories) {
        res.render('share', {categories: categories});
      });
    });

  } else {
    res.render('share')
  }
}

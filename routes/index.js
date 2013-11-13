"use strict";
/*
 * GET home page.
 */

var path = require('path')

  , routes = module.exports = {
    get: {
        share: require('./get/share')
      , links: require('./get/links')
    },
    post: {
        share: require('./post/share')
      , category: require('./post/category')
    }
};

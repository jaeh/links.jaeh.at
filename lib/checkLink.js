"use strict";

var http = require('http')
  , https = require('https')
  , async = require('async')
  , path = require('path')
  , slugify = require(path.join(__dirname, 'slugify'));

//please dont create pull requests with complex regexes.
//not using regex might be slower and more clumsy in some cases,
//but it leads to code that is a lot easier to read and change. 

var checkUrl = function (url, cb) {
  var errors = []
    , handler = url.indexOf('https') === 0 ? https : http;

  //urls that are no strings should not be possible.
  if (typeof url !== 'string') {
    if (typeof cb === 'function') { return cb('url is not a string');}
  }

  //catch both https and http at once:
  if (url.indexOf('http') === -1) {
    url = 'http://' + url;
  }

  handler.get(url, function(res) {
    console.log('res = ', res.statusCode);
    if (typeof cb === 'function') { cb(null);}
  }).on('error', function(e) {
    errors.push('url is not reachable.');
    if (typeof cb === 'function') { cb(errors);}
  });
}


module.exports = function (link, cb) {
  checkUrl(link.url, function(errors) {
    if (errors && errors.length > 0 && typeof cb === 'function') {
      return cb(errors);
    }

    if (!link.text 
       || typeof link.text !== 'string' 
       || link.text === 'text') {
      link.text = link.url;
    }

    link.slug = slugify(link.text);

    if (link.desc === 'description') {
      link.desc = undefined;
    }

    if (link.uploader === 'uploader') {
      link.uploader = undefined;
    }

    cb(null, link);
  });
}

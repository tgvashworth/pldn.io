var url = require('url');

/**
 * Parse a URL into Pulldown arguments
 */
var urlParse = module.exports = (function () {
  'use strict';

  var urlParse = {};

  urlParse.parse = function (urlStr) {
    var urlData = url.parse(urlStr);
    return urlData.pathname.split('/').filter(function (v) { return !!v; });
  };

  urlParse.mw = {};

  urlParse.mw.parse = function (req, res, next) {
    req.args = urlParse.parse(req.url);
    next();
  };

  return urlParse;

}());
module.exports = (function () {
  'use strict';

  var cache = {};
  var store = {};

  cache.get = function (id, cb) {
    return cb(null, store[id]);
  };

  cache.set = function (id, value, cb) {
    return cb(null, store[id] = value);
  };

  cache.mw = {};
  cache.mw.get = function (req, res, next) {
    console.log('get');
    cache.get(req.url, function (err, result) {
      if (result) {
        res.setHeader('X-Cached', true);
        return res.end(result);
      }
      next();
    });
  };

  return cache;

}());
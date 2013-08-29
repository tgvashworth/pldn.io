var pkg      = require('./package.json');
var connect  = require('connect');
var moment   = require('moment');
var urlp     = require('./lib/urlp');
var pulldown = new (require('pulldown'))();
var supplant = require('./lib/supplant');
var cache    = require('./lib/cache');

var cacheConfig = {
  maxAge: moment().add('months', 1).diff(moment(), 'seconds'),
  expiresDate: moment.utc().add('months', 1).toDate().toUTCString(),
  errorExpiresDate: moment.utc().toDate().toUTCString()
};

var errorStr = function (msg) {
  return '(\'console\' in window) && console.log("pldn.io: ' + msg + '")';
};

connect()
  .use(connect.logger('dev'))
  .use(connect.compress())
  .use(function (req, _, next) {
    req.pldn = {};
    next();
  })
  // Parse the URL
  .use(urlp.mw.parse)
  // Set the content type as javascript
  .use(function (req, res, next) {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", supplant("no-transform,public,max-age={maxAge}", cacheConfig));
    res.setHeader("Expires", supplant("{expiresDate}", cacheConfig));
    next();
  })
  // Cache
  .use(cache.mw.get)
  // Grab the files from pulldown
  .use(function (req, res, next) {
    pulldown.init(req.args, function (err, files) {
      if (err) { return next('Pulldown module failed.'); }
      req.pldn.files = files;
      next();
    });
  })
  // Produce the final response
  .use(function (req, res, next) {
    var results = req.pldn.files.map(function (file) {
      if (!file.contents) { return errorStr(file.searchTerm + ' not found.'); }
      return file.contents;
    });
    results.unshift(supplant('/** Served with <3 by pldn.io v{version} **/', pkg));
    req.pldn.response = results.join('\n');
    next();
  })
  // Cache the response
  .use(function (req, res, next) {
    cache.set(req.url, req.pldn.response, function (err) {
      if (err) { return next(err); }
      next();
    });
  })
  // Serve the response
  .use(function (req, res) {
    res.statusCode = 200;
    res.end(req.pldn.response);
  })
  // Error handler
  .use(function (err, req, res, next) {
    res.setHeader("Cache-Control", "no-transform,public,max-age=0,s-maxage=0,no-cache");
    res.setHeader("Expires", supplant("{errorExpiresDate}", cacheConfig));
    res.statusCode = 500;
    res.end(errorStr(err.message || err));
  })
  .listen(process.env.PORT || 0, function () {
    console.log('pldn.io @ http://localhost:' + this.address().port);
  });

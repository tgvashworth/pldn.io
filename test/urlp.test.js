var t = require('tap');
var urlp = require('../lib/urlp');

t.test('url', function (t) {

  t.test('gets all path arguments', function (t) {
    var args = urlp.parse('http://pldn.io/jquery/underscore/backbone');
    t.deepEqual(args, ['jquery', 'underscore', 'backbone'], 'Args match up.');
    t.end();
  });

  t.test('gets all path arguments with version', function (t) {
    var args = urlp.parse('http://pldn.io/jquery@2.0.0/underscore@1.4.4/backbone');
    t.deepEqual(args, ['jquery@2.0.0', 'underscore@1.4.4', 'backbone'], 'Args match up.');
    t.end();
  });

  t.test('gets all path arguments dots & versions', function (t) {
    var args = urlp.parse('http://pldn.io/jquery@2.0.0/underscore.js@1.4.4/backbone');
    t.deepEqual(args, ['jquery@2.0.0', 'underscore.js@1.4.4', 'backbone'], 'Args match up.');
    t.end();
  });

  t.end();

});
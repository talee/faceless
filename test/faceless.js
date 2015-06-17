// jshint node: true, mocha: true
'use strict';
var assert = require('assert');
var fs = require('fs');

suite('Faceless', function() {
  var Faceless = require('../src/faceless');
  //var faceless = new (require('../src/faceless'))({});

  var target = fs.realpathSync('test/test.xhtml');

  test('read files', function(done) {
    Faceless.getDoc(target).then(function (doc) {
      assert(doc, 'Doc should exist.');
      done();
    });
  });
});

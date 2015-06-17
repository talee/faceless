// jshint node: true, mocha: true
'use strict';
var assert = require('assert');
var fs = require('fs');
var dom5 = require('dom5');
var p = dom5.predicates;

suite('Faceless', function() {
  var Faceless = require('../src/faceless');

  var target = fs.realpathSync('test/test.xhtml');

  test('read files', function(done) {
    Faceless.getDoc(target).then(function (doc) {
      assert(doc, 'Doc should exist.');
      done();
    });
  });

  // Integration tests
  var faceless = new (require('../src/faceless'))({});
  test('use tag and behavior rewriters', function(done) {
    faceless.process(target, function(){}).then(function (output) {
      var doc = dom5.parse(output);
      var input = dom5.query(doc, p.hasTagName('input'));
      assert(input, 'Tag rewriters should be applied');
      assert(dom5.getAttribute(input, 'value').indexOf('{{') === 0,
          'Behavior rewriters should be applied');
      done();
    }).catch(done);
  });

});

// jshint node: true, mocha: true
'use strict';
var assert = require('assert');
var dom5 = require('dom5');
var p = dom5.predicates;
var u = require('../test-util');

var ROOT = process.cwd() + '/';

suite('Behaviors', function() {
  console.log();
  var ValueHolder = require(ROOT + 'src/behaviors/value-holder');

  test('rewrite value as value holder', function() {
    var inputText = u.getInputNode(u.HTML.H.Input, p.hasTagName('h:inputtext'));
    var valueHolder = new ValueHolder();
    var input = valueHolder.rewrite(inputText);
    assert.equal('{{bean.val}}', dom5.getAttribute(input, 'value'));
  });

});

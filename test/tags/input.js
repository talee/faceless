// jshint node: true, mocha: true
'use strict';
var assert = require('assert');
var dom5 = require('dom5');
var p = dom5.predicates;
var u = require('../test-util');

var ROOT = process.cwd() + '/';

suite('Inputs', function() {
  var InputTextRewriter = require(ROOT + 'src/tags/input-text');

  test('rewrite h:input to input', function() {
    var inputText = u.getInputNode(u.HTML.H.Input, p.hasTagName('h:inputtext'));
    var inputTextRewriter = new InputTextRewriter();
    assert(inputText, 'h:inputText should exist in document');
    var input = inputTextRewriter.rewrite(inputText);

    assert.equal('input', input.nodeName);
    assert.equal('text', dom5.getAttribute(input, 'type'));
  });

});

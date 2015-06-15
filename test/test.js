// jshint node: true, mocha: true
'use strict';
var assert = require('assert');

suite('Inputs', function() {
  var ValueHolder = require('../src/behaviors/value-holder');
  var InputTextRewriter = require('../src/tags/input-text');
  var parser = new (require('parse5').Parser)();
  var dom5 = require('dom5');

  var p = dom5.predicates;
  var HTML = {
    H: {
      Input: '<h:inputText value="#{bean.val}"></h:inputText>'
    }
  };

  function getInputNode(str, predicate) {
    var doc = parser.parse(str);
    return dom5.query(doc, predicate);
  }

  test('rewrite h:input to input', function() {
    var inputText = getInputNode(HTML.H.Input, p.hasTagName('h:inputtext'));
    var inputTextRewriter = new InputTextRewriter();
    assert(inputText, 'h:inputText should exist in document');
    var input = inputTextRewriter.rewrite(inputText);

    assert.equal('input', input.nodeName);
    assert.equal('text', dom5.getAttribute(input, 'type'));
  });

  test('rewrite value as value holder', function() {
    var inputText = getInputNode(HTML.H.Input, p.hasTagName('h:inputtext'));
    var valueHolder = new ValueHolder();
    var input = valueHolder.rewrite(inputText);
    assert.equal('{{bean.val}}', dom5.getAttribute(input, 'value'));
  });

});

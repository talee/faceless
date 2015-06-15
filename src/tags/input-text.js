// jshint node: true
'use strict';

var dom5 = require('dom5');

function InputTextRewriter() {
}

InputTextRewriter.prototype = {

  /**
   * @param {Node} inputText A h:inputText node.
   * @param {Node}
   */
  rewrite: function(inputText) {
    if (!InputTextRewriter.matches(inputText)) {
      return inputText;
    }
    var input = dom5.constructors.element('input');
    inputText.attrs.forEach(function(attr) {
      input.attrs.push({
        name: attr.name,
        value: attr.value
      });
    });
    input.attrs.push({
      name: 'type',
      value: 'text'
    });
    dom5.replace(inputText, input);
    return input;
  }
};

InputTextRewriter.matches = function(inputText) {
  return inputText.tagName == 'h:inputtext';
};

module.exports = InputTextRewriter;

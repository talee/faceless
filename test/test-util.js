// jshint node: true
'use strict';
var parser = new (require('parse5').Parser)();
var dom5 = require('dom5');

module.exports = {

  HTML: {
    H: {
      Input: '<h:inputText value="#{bean.val}"></h:inputText>'
    }
  },

  getInputNode: function(str, predicate) {
    var doc = parser.parse(str);
    return dom5.query(doc, predicate);
  }

};

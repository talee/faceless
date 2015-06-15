// jshint node: true
'use strict';

require('../utils/utils');
var dom5 = require('dom5');

function ValueHolder() {
}

var START_KEY = '#{';
var END_KEY = '}';

var REPLACE_START_KEY = '{{';
var REPLACE_END_KEY = '}}';

ValueHolder.prototype =  {

  /**
   * @param {Node} node A DOM Node
   * @return {Node}
   */
  rewrite: function(node) {
    var valueAttr = node.attrs[dom5.getAttributeIndex(node, 'value')];
    if (!valueAttr) {
      return node;
    }
    valueAttr.value = valueAttr.value.replace(START_KEY, REPLACE_START_KEY)
        .replace(END_KEY, REPLACE_END_KEY);
    return node;
  }
};

module.exports = ValueHolder;

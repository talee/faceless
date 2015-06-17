// jshint node: true
'use strict';

require('../utils/utils');
var dom5 = require('dom5');

function ValueHolder() {
}

ValueHolder.prototype =  {

  START_KEY: '#{',
  END_KEY: '}',

  REPLACE_START_KEY: '{{', 
  REPLACE_END_KEY: '}}',   

  // TODO: Move out to EL expression rewriter?
  /**
   * @param {Node} node A DOM Node
   * @return {Node}
   */
  rewrite: function(node) {
    var valueAttr = node.attrs[dom5.getAttributeIndex(node, 'value')];
    if (!valueAttr) {
      return node;
    }
    valueAttr.value = valueAttr.value.replace(this.START_KEY,
        this.REPLACE_START_KEY)
        .replace(this.END_KEY, this.REPLACE_END_KEY);
    return node;
  }
};

module.exports = ValueHolder;

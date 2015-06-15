// jshint node: true
'use strict';

var dom5 = require('dom5');

// Taken from https://github.com/PolymerLabs/dom5/
// http://polymer.github.io/LICENSE.txt
function getAttributeIndex(element, name) {
  if (!element.attrs) {
    return -1;
  }
  var n = name.toLowerCase();
  for (var i = 0; i < element.attrs.length; i++) {
    if (element.attrs[i].name.toLowerCase() === n) {
      return i;
    }
  }
  return -1;
}

dom5.getAttributeIndex = dom5.getAttributeIndex || getAttributeIndex;

module.exports = {};

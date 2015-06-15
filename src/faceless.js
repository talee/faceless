// jshint node: true
'use strict';

function Faceless(opts) {
  console.log('args:', opts);
}

Faceless.prototype = {
  process: function(file, cb) {
  }
};

module.exports = Faceless;

// jshint node: true
'use strict';

var fs = require('fs');
var behaviors = require('./behaviors/behaviors');
var tags = require('./tags/tags');
var dom5 = require('dom5');

var Promise = global.Promise || require('es6-promise').Promise;

function Faceless(opts) {
  this.opts = opts;
}

Faceless.getDoc = function (target) {
  return new Promise(function (resolve, reject) {
    fs.readFile(target, {encoding: 'utf-8'}, function(err, contents) {
      if (err) {
        reject(err);
      }
      var doc = dom5.parse(contents);
      resolve(doc);
    });
  });
};

function rewrite(node) {
  if (!dom5.isElement(node)) {
    return node;
  }
  node.attrs.forEach(function(attr) { 
    var Behavior = behaviors[attr.name];
    if (!Behavior) {
      return;
    }
    new Behavior().rewrite(node);
  });
  var Rewriter = tags[node.tagName.toLowerCase()];
  if (!Rewriter) {
    // No handler found
    return node;
  }
  return new Rewriter().rewrite(node);
}

Faceless.prototype = {

  process: function(target, cb) {
    return Faceless.getDoc(target)
      .then(this._process)
      .then(function(doc) {
        var results = dom5.serialize(doc);
        cb(null, results);
        return results;
      }).catch(cb);
  },

  _process: function(doc) {
    dom5.nodeWalkAll(doc, rewrite);
    return doc;
  }
};

module.exports = Faceless;

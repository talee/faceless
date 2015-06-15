// jshint node: true
'use strict';

var p = require('dom5').predicates;

var tags = {
  'h:inputtext': require('./input-text')
};

var matchers = [];
for (var tag in tags) {
  matchers.push(tags[tag].matches);
}
tags.matches = p.OR.apply(matchers);
module.exports = tags;

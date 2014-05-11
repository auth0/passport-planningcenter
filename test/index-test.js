var vows = require('vows');
var assert = require('assert');
var util = require('util');
var pc = require('passport-planningcenter');


vows.describe('passport-pc').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(pc.version);
    },
  },
  
}).export(module);
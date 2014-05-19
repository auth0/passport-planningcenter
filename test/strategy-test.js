var vows = require('vows');
var assert = require('assert');
var util = require('util');
var pcStrategy = require('passport-planningcenter/strategy');


vows.describe('planningcenterStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new pcStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named planningcenter': function (strategy) {
      assert.equal(strategy.name, 'planningcenter');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new pcStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        var body = JSON.stringify({"id": "4860901","account_center_id": "5062683","first_name": "Central","last_name": "Test","photo_thumbnail_url": "https://www.planningcenteronline.com/photos/thumbnail/missing.png","name": "Central Test"});
        callback(null, body, undefined);
      };
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'planningcenter');
        assert.equal(profile.id, '4860901');
        assert.equal(profile._json.id, '4860901');
        assert.equal(profile._json.first_name, 'Central');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new pcStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        callback(new Error('something went wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
}).export(module);
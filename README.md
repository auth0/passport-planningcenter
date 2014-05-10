passport-planningcenter
=======================

# Passport-PlanningCenter

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [PlanningCenter](http://get.planningcenteronline.com/api) using the OAuth 1.0a API.

This module lets you authenticate using Fitbit in your Node.js applications.
By plugging into Passport, Planning Center authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-planningcenter

## Usage

#### Configure Strategy

The PLanning Center authentication strategy authenticates users using a Planning Center account
and OAuth tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumer key, consumer secret, and callback URL.

    passport.use(new PlanningCenterStrategy({
        consumerKey: PLANNINGCENTER_CONSUMER_KEY,
        consumerSecret: PLANNINGCENTER_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/pc/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'planningcenter'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/pc',
      passport.authenticate('planningcenter'));

    app.get('/auth/pc/callback', 
      passport.authenticate('planningcenter', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Auth0 Inc. <[https://auth0.com/](https://auth0.com)>

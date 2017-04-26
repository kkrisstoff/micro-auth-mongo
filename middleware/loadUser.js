//var assert = require('assert');
var User = require('models/user').User;

module.exports = function(req, res, next) {
    //todo: res.locals...
    //assert(req.session);
    req.user = res.locals.user = null;

    if (!req.session.user) return next();

    User.findById(req.session.user).exec(function(err, user) {
        if (err) return next(err);

        //todo: res.locals
        req.user = res.locals.user = user;
        next();
    });

};
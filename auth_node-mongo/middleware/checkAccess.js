//var assert = require('assert');
var HttpError = require('error').HttpError;

module.exports = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
        //return next(new HttpError(401, "You aren't authorized."));
    }

    next();
};
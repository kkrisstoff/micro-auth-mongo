var User = require('models/user').User;
var async = require('async');

exports.get = function (req, res) {
    res.render('login', {
        title: 'Login',
        page: 'login'
    });
};

exports.post = function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    async.waterfall([
        function(callback) {
            User.findOne({username: username}).exec(callback);
        },
        function(user, callback) {
            if (!user) {
                res.send(403, 'User isn\'t exist');
//                user = new User({
//                    username: req.body.username,
//                    password: req.body.password
//                });
//                user.save(function(err, user, affected) {
//                    callback(err, user);
//                });
            } else {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    res.send(403, 'Invalid Password');
                }
            }
        }
    ],
        function(err, user) {
            if (err) return next(err);

            req.session.user = user._id;
            res.json(user.getPublicFields());
        }
    );
    //Log in via cookie
//    res.cookie('access', 'AOK');
//    res.redirect('dashboard');
};
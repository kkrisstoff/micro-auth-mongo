var checkAccess = require('middleware/checkAccess');

module.exports = function (app) {

    //Users for testing
    app.get('/allUsers', function (req, res, next){
        var User = require('models/db/user').User;
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        })
    });

    /* Home page */
    app.get('/', function(req, res) {
        res.redirect('/dashboard');
    });

    /* Login page */
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    /* Log Out */
    app.get('/logout', require('./logout').post);

    /* Dashboard page */
    app.get('/dashboard', checkAccess, require('./dashboard').get);

    /* Tests page */
    app.get('/tests', checkAccess, require('./tests').get);
};

/* check Auth via cookie */
//function checkAccess (req, res, next) {
//    if (!req.cookies || !req.cookies.access || req.cookies.access !== "AOK"){
//        res.redirect('/login');
//    } else {
//        next();
//    }
//}

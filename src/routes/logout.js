exports.post = function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');

    // Logout via cookie
//        res.cookie('access', '');
//        res.redirect('/');
};
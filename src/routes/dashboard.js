exports.get = function (req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        page: 'dashboard'
    });
};
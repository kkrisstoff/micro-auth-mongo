var models = require('models');

exports.get = function (req, res) {
    res.render('tests', {
        title: 'Test',
        page: 'test',
        results: models.testsCollection.toJSON() || {}
    });
};
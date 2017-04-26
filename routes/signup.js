var mongoose = require('lib/mongoose');
var async= require('async');

mongoose.set('debug', true);

exports.get = function (req, res) {
    res.render('registration', {
        title: 'Registration',
        page: 'registration'
    });
};

exports.post = function (req, res, next) {
    var username = req.body.username,
        mail = req.body.email || "" ,
        password = req.body.password;

    async.series([
        open,
        dropDatabase,
        requireModels,
        function (callback) {
            var userData = {
                name: username,
                pass: password,
                mail: mail
            };
            createUsers(callback, userData);
        }
    ], function (err, results) {
        console.log("#Reg End");
        console.log(arguments);
        mongoose.disconnect();
        process.exit(err ? 255 : 0);
    });
    //Log in via cookie
//    res.cookie('access', 'AOK');
//    res.redirect('dashboard');
};





function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){
    require('./models/user');
    console.log("#mongoose models");
    console.log(mongoose.models);

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);  //ensureIndex:  callback will call only if indexes created
    }, callback);
}

function createUsers(callback, data){
    /*users = [
        {username: 'admin', password: 'admin123'},
        {username: 'user', password: 'user123'}
    ],*/
    console.log(data);
    var user = {
            username: data.name,
            password: data.pass,
            mail: data.mail
        };

    var newUser = new mongoose.models.User(user);
    newUser.save(callback);
}

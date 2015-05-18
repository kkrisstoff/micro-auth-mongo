/**
 *
 *
 */
var mongoose = require('mongoose'),
    log = require('lib/log')(module),
    config = require('./../config');

mongoose.connect(config.get('db'));
if (config.get('NODE_ENV') === 'development') {
    mongoose.set('debug', true);
}

var db = mongoose.connection;
db.on('error', function (err) {
    if (err) return log.error(err);
    log.info('connected');
});

db.once('open', function (callback) {
    log.info("DB is opened");
    if (callback && typeof callback == "function"){
        callback.apply(this, arguments);
    }
});

log.info("DB initialized");
module.exports = mongoose;



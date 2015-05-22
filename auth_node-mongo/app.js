var express = require('express');

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var logger = require('morgan');//connect logger middleware

var log = require('./lib/log')(module);

//DB connection
var mongoose = require('lib/mongoose');

var HttpError = require('./error').HttpError;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//connect middleware
app.use(favicon(__dirname + '/public/favicon.ico'));
if (app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Cookie
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    store: new MongoStore({
        mongooseConnection: mongoose.connection

        //url: config.get('db'),
        //collection: 'sessions'
    })
}));

app.use(require('middleware/resExtensions'));
app.use(require('middleware/resLocals'));

//Routes
require('./routes')(app);
app.use(express.static(path.join(__dirname, 'public')));

//Error Handler
app.use(function (err, req, res, next) {
    log.error('#server error: ' + err.status + ' '+ err.message);
    if (typeof err == 'number'){
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            app.use(errorHandler());
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

var port = config.get('port');
var server = app.server = http.createServer(app);
server.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", port, app.get('env'));
});
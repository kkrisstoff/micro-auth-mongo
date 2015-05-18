var util = require('util');
var http = require('http');
var debug = require('debug')('httpError');

function HttpError(status, message) {
    debug("#httpError");
    debug(status, message);
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);
module.exports = HttpError;

HttpError.prototype.name = 'HttpError';
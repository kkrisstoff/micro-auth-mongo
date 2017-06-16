import http from "http";
import getLogger from "../lib/log";

const logErr = getLogger(module).error;

export default class HttpError extends Error {
  constructor(status, message, ...args) {
    super(status, message, ...args);

    logErr("#httpError");
    logErr(status, message);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
  }
}

const name = "HttpError";
export { name };

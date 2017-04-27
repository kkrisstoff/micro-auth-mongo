import mongoose from "mongoose";
import config from "./../config";
import getLogger from "./log";

const logger = getLogger(module);
const log = logger.debug;
const lerr = logger.error;
const conf = config.db;

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

const opts = {
  server: { auto_reconnect: false },
  user: conf.user,
  pass: conf.password
};
const db = mongoose.createConnection(conf.path, opts);

db.on("error", err => {
  lerr(err);
});

db.once("open", callback => {
  log("onOpen", callback);

  if (callback && typeof callback === "function") {
    callback.apply(this, arguments);
  }
});

log("DB initialized");
module.exports = mongoose;

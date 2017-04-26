import mongoose from "mongoose";

// import config from "./../config";
// log = require('lib/log')(module),

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

const log = console.log;

const opts = {
  server: { auto_reconnect: false },
  user: "authadmin",
  pass: "authadmin1"
};
const db = mongoose.createConnection(
  "mongodb://ds145009.mlab.com:45009/auth",
  opts
);

db.on("error", err => {
  log("ERROR: ", err);
});

db.once("open", callback => {
  log("onOpen", callback);

  if (callback && typeof callback === "function") {
    callback.apply(this, arguments);
  }
});

log("DB initialized");
module.exports = mongoose;

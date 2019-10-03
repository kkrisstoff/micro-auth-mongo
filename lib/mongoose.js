import mongoose from "mongoose";
import config from "../config";
import getLogger from "./log";

const logger = getLogger(module);
const log = logger.debug;
const lerr = logger.error;
const conf = config.db;

let db = null;

const initDb = () => {
  if (db !== null) return db;

  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }

  const opts = {
    poolSize: 2,
    promiseLibrary: global.Promise,
    user: conf.user,
    pass: conf.password,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  db = mongoose.createConnection(conf.path, opts);

  db.on("error", err => {
    lerr(err);
  });

  db.once("open", callback => {
    log("onOpen", callback);

    if (callback && typeof callback === "function") {
      callback.apply(this, arguments);
    }
  });

  return db;
};

const getDb = () => db;

export default {
  initDb,
  getDb
};

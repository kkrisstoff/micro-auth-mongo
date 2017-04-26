import rc from "rc";
import config from "./config.json";

const appName = "micro-auth";
const defaults = {
  cookie: {
    maxAge: 1200000
  },
  log: {
    maxSize: 5242880,
    maxFiles: 10,
    consoleLevel: 30
  }
};
const conf = rc(appName, defaults, config);

module.exports = conf;

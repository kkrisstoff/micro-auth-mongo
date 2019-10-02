import winston from "winston";

const ENV = process.env.NODE_ENV;

function getLogger(module) {
  // TODO: fix it
  // split('/') for mac;   split('\\') for win
  const path = module.filename.split("/").slice(-2).join("/");

  const logger = winston.createLogger({
    level: ENV === "development" ? "debug" : "error",
    format: winston.format.json(),
    defaultMeta: { service: path },
    transports: [
      new winston.transports.Console()
    ]
  });

  return logger;
  // return ENV === "development" ? logger.debug : logger.error;
}

module.exports = getLogger;

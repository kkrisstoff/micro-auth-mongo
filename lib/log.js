import winston from "winston";

const ENV = process.env.NODE_ENV;

function getLogger(module) {
  // TODO: fix it
  // split('/') for mac;   split('\\') for win
  const path = module.filename.split("/").slice(-2).join("/");

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: ENV === "development" ? "debug" : "error",
        label: path
      })
    ]
  });

  return logger;
  // return ENV === "development" ? logger.debug : logger.error;
}

module.exports = getLogger;

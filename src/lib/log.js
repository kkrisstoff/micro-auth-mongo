import winston from "winston";

const ENV = process.env.NODE_ENV;

export default function getLogger(module) {
  // TODO: fix it
  // split('/') for mac;   split('\\') for win
  const path = module.filename.split("/").slice(-2).join("/");

  return winston.createLogger({
    level: ENV === "development" ? "debug" : "error",
    format: winston.format.json(),
    defaultMeta: { file: path },
    transports: [
      new winston.transports.Console()
    ]
  });
}

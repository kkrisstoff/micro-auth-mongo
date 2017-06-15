import Koa from "koa";
import db from "./lib/mongoose";
import schema from "./models";
import config from "./config";
import setRoutes from "./routes";
import getLogger from "./lib/log";

const logger = getLogger(module);
const log = logger.debug;
const lerr = logger.error;
// const HttpError = error.HttpError;
const app = new Koa();

// DB connection
db.initDb();

// Set schema
schema.setSchema();

// Routes
setRoutes(app);

// Cookie
// var session = require('express-session');
// var MongoStore = require("connect-mongo")(session);
// app.use(cookieParser());

// app.use(
//   session({
//     secret: config.get("session:secret"),
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection

//       //url: config.get('db'),
//       //collection: 'sessions'
//     })
//   })
// );

// app.use(require("middleware/resExtensions"));
// app.use(require("middleware/resLocals"));

// Error Handler
app.use((err, req, res, next) => {
  lerr(`#server error: ${err.status} ${err.message}`);

  // if (typeof err == "number") {
  //   err = new HttpError(err);
  // }

  // if (err instanceof HttpError) {
  //   res.sendHttpError(err);
  // } else {
  //   if (app.get("env") == "development") {
  //     app.use(errorHandler());
  //   } else {
  //     lerr(err);
  //     err = new HttpError(500);
  //     res.sendHttpError(err);
  //   }
  // }
});

const port = config.port;
app.listen(port, () => {
  log("Server listening on port %d in %s mode", port);
});

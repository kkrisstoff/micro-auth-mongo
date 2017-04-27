import Koa from "koa";
import config from "./config";
import getLogger from "./lib/log";
import setRoutes from "./routes";
import error from "./error";

const logger = getLogger(module);
const log = logger.debug;
const lerr = logger.error;
const HttpError = error.HttpError;

// DB connection
import mongoose from "./lib/mongoose";

const app = new Koa();

//Cookie
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

// Routes
setRoutes(app);

//Error Handler
app.use(function(err, req, res, next) {
  lerr("#server error: " + err.status + " " + err.message);

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

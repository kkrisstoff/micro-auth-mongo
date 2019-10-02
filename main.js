import Koa from "koa";
import views from "koa-views";
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

// Must be used before any router is used
// Use template rendering middleware
app.use(views(__dirname + '/views', {
  map: {
    ejs: 'ejs'
  }
}));

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
app.on('error', (err, ctx)  => {
  lerr(`#server error: ${err.status} ${err.message}`);
  // lerr(ctx);

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

const PORT = process.env.PORT || config.port
app.listen(PORT, () => {
  log("Server listening on port %d in %s mode", PORT, );
});

import Koa from "koa";
import views from "koa-views";
import config from "config";
import db from "./lib/mongoose";
import schema from "./models";
import getLogger from "./lib/log";
import error from './middleware/error';
import { routes, allowedMethods } from './middleware/routes';

const appConfig = config.get('app');

const logger = getLogger(module);
const log = logger.debug;
// const lerr = logger.error;


// DB connection
db.initDb();

// Set schema
schema.setSchema();

// Create App
const app = new Koa();

// Error Handler
app.use(error);

// Use template rendering middleware (Must be used before any router is used)
app.use(views(`${__dirname  }/views`, {
  map: {
    // use ejs engine
    ejs: 'ejs'
  }
}));

// logger
app.use(async function useLogger(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// Routes
app.use(routes());
app.use(allowedMethods());

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


// RUN App
const PORT = process.env.PORT || appConfig.port;
app.listen(PORT, () => {
  log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

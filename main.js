import Koa from "koa";
import config from "./config";

// var log = require("./lib/log")(module);
const log = args => console.log(">>>", args);

// DB connection
import mongoose from "./lib/mongoose";

// var HttpError = require("./error").HttpError;

const app = new Koa();

// app.set('views', __dirname + '/views');

//connect middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

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

//Routes
// require("./routes")(app);
// app.use(express.static(path.join(__dirname, "public")));

//Error Handler
app.use(function(err, req, res, next) {
  log.error("#server error: " + err.status + " " + err.message);
  if (typeof err == "number") {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get("env") == "development") {
      app.use(errorHandler());
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

const port = config.port;
app.listen(port, () => {
  log("Server listening on port %d in %s mode", port);
});

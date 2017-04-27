import Router from "koa-router";
import koaBody from "koa-json-body";
import getAllUsersController from "../controllers/getAllUsers";
import createNewUserController from "../controllers/createNewUser";

var checkAccess = require("../middleware/checkAccess");
const router = Router();

module.exports = app => {
  app.use(koaBody({ fallback: true }));

  // Get all users
  router.get("/all-users", getAllUsersController);

  // Create User
  router.post("/new-user", createNewUserController);

  // /* Home page */
  // router.get("/", function(req, res) {
  //   res.redirect("/home");
  // });

  // /* Login page */
  // router.get("/login", require("./login").get);
  // router.post("/login", require("./login").post);

  // /* Sign Up page */
  // router.get("/signup", require("./signup").get);
  // router.post("/signup", require("./signup").post);

  // /* Log Out */
  // router.get("/logout", require("./logout").post);

  // /* Dashboard page */
  // router.get("/dashboard", checkAccess, require("./dashboard").get);

  // /* Tests page */
  // router.get("/tests", checkAccess, require("./tests").get);

  app.use(router.routes());
};

/* check Auth via cookie */
//function checkAccess (req, res, next) {
//    if (!req.cookies || !req.cookies.access || req.cookies.access !== "AOK"){
//        res.redirect('/login');
//    } else {
//        next();
//    }
//}

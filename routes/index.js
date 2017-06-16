import Router from "koa-router";
import koaBody from "koa-json-body";
import getAllUsersController from "../controllers/getAllUsers";
import createNewUserController from "../controllers/createNewUser";
import showPage from "../controllers/showPage";

const getSignup = require("./signup").get;
// var checkAccess = require("../middleware/checkAccess");
const router = Router();

export default function(app) {
  app.use(koaBody({ fallback: true }));

  // Get all users
  router.get("/all-users", getAllUsersController);

  // Create User
  router.post("/new-user", createNewUserController);

  /* Home page */
  // router.get("/", function(req, res) {
  //   res.redirect("/home");
  // });

  /* Login page */
  // router.get("/login", require("./login").get);
  // router.post("/login", require("./login").post);

  /* Registration page */
  router.get("/account/create", async (...args) => {
    await showPage("registration", {}, ...args);
  });
  // router.post("/account/create", require("./signup").post);

  /* Log Out */
  // router.get("/logout", require("./logout").post);

  /* Dashboard page */
  // router.get("/dashboard", checkAccess, require("./dashboard").get);

  /* Tests page */
  // router.get("/tests", checkAccess, require("./tests").get);

  app.use(router.routes());
}

/* check Auth via cookie */
// function checkAccess(req, res, next) {
//   if (!req.cookies || !req.cookies.access || req.cookies.access !== "AOK") {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// }

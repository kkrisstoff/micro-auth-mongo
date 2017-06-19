import Router from "koa-router";
import koaBody from "koa-json-body";
import getAllUsersController from "../controllers/getAllUsers";
import createNewUserController from "../controllers/createNewUser";
import loginController from "../controllers/login";
import showPage from "../controllers/showPage";

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
  router.get("/account/login", async (...args) => {
    await showPage("login", {title: "Log In"}, ...args);
  });
  router.post("/login", loginController);

  /* Registration page */
  router.get("/account/create", async (...args) => {
    await showPage("registration", {title: "Registration"}, ...args);
  });
  // router.post("/account/create", require("./signup").post);

  /* Log Out */
  // router.get("/logout", require("./logout").post);

  /* Dashboard page */
  router.get("/dashboard", /* checkAccess, */async (...args) => {
    await showPage("dashboard", {title: "Dashboard"}, ...args);
  });

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

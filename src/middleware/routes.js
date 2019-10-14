import Router from 'koa-router';
import koaBody from 'koa-body';

import usersSvc from "../services/usersSvc";
import { showPage } from "../services/ui";

import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;

const { createUser, getAllUsers, getUserByName, checkPassword } = usersSvc;
const router = new Router();

router
  // Get all users
  .get("/users", async (ctx) => {
    ctx.body = await getAllUsers();
  })
  // Get user by name
  .get('/users/:name', async (ctx) => {
    const userData = await getUserByName(ctx.params.name);
    if (userData) {
      ctx.body = {
        id: userData._id,
        username: userData.username,
        email: userData.email,
        created: userData.created,
      }
    } else {
      ctx.status = 204
    }
  })
  // Create User
  .post("/user/create", koaBody(), async (ctx, next) => {
    const { username, email, password } = ctx.request.body;

    if (!username || !email || !password) {
      return next(new Error("all data are required"));
    }

    try {
      const newUser = await createUser(username, email, password );
      ctx.body = {
        user: newUser.get("username"),
        email: newUser.get("email")
      };
    } catch (err) {
      return next(err);
    }
    // TODO: don't need return
    return ctx.body;
  })
  // Check password
  .post("/user/login", koaBody(), async (ctx, next) => {
    const { username, password } = ctx.request.body;
    try {
      const userData = await checkPassword(username, password);
      ctx.body = userData;
    } catch (err) {
      return next(err);
    }
    return { user: username };

    // Log in via cookie
    // req.session.user = user._id;
    // res.cookie("access", "AOK");
    // res.redirect("dashboard");
  })
  // Logout
  // .post("/user/logout", koaBody(), async (ctx, next) => {
  //   ctx.request.session.destroy();
  //   ctx.request.redirect('/login');
  //
  //   // Logout via cookie
  //   // ctx.request.cookie('access', '');
  //   // ctx.request.redirect('/');
  // })

  /* UI rotes */
  .get("/", (req, res) => {
    res.redirect("/dashboard");
  })
  // Dashboard page
  .get("/dashboard", /* checkAccess, */async (...args) => {
    await showPage("dashboard", {title: "Dashboard"}, ...args);
  })
  // Login page
  .get("/account/login", async (...args) => {
    await showPage("login", {title: "Log In"}, ...args);
  })
  // Registration page
  .get("/account/create", async (...args) => {
    await showPage("registration", {title: "Registration"}, ...args);
  });
// Log Out
// .get("/logout", require("./logout").post);

export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }

/* check Auth via cookie */
// function checkAccess(req, res, next) {
//   if (!req.cookies || !req.cookies.access || req.cookies.access !== "AOK") {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// }

import usersService from "../services/usersSvc";
import { HttpError } from "../error";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
// const logErr = logger.error;

async function loginUser(ctx, next) {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  let userDataPromise;
  let userData;

  try {
    userDataPromise = usersService.checkPassword(username, password)
  } catch (err) {
    return next(err);
  }

  userData = await userDataPromise;
  log("logged In As >>> ", userData);
  // req.session.user = user._id;
  // res.json(user.getPublicFields());
  ctx.body = { user: username };
  return { user: username };

  // Log in via cookie
  // res.cookie("access", "AOK");
  // res.redirect("dashboard");
}

export default loginUser;

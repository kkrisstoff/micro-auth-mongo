import config from "../config";
import usersService from "../services/usersSvc";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
// const logErr = logger.error;
const REDIRECT_URL = config.redirectUrl;

async function loginUser(ctx, next) {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;
  let userDataPromise;

  try {
    userDataPromise = usersService.checkPassword(username, password);
  } catch (err) {
    return next(err);
  }

  const userData = await userDataPromise;

  userData.redirect = REDIRECT_URL;
  ctx.body = userData;
  // req.session.user = user._id;
  log(">> logged In As: ", userData.name);

  return { user: username };

  // Log in via cookie
  // res.cookie("access", "AOK");
  // res.redirect("dashboard");
}

export default loginUser;

import getLogger from "../lib/log";
import usersService from "../services/usersSvc";

const logger = getLogger(module);
const log = logger.debug;
const logErr = logger.error;
const createUser = usersService.createUser;

async function createNewUser(ctx, next) {
  const newUserName = ctx.request.body.username;
  const newUserEmail = ctx.request.body.email;
  const newUserPassword = ctx.request.body.password;
  let newUser;
  let parsedData;

  if (!newUserName || !newUserEmail || !newUserPassword) {
    return next(new Error("all data are reuired"));
  }

  try {
    newUser = await createUser(newUserName, newUserEmail, newUserPassword);
    parsedData = {
      user: newUser.get("username"),
      email: newUser.get("email")
    };
  } catch (err) {
    logErr(err.message);
    parsedData = {
      errorStatus: err.code,
      errorMessage: err.message
    };
  }

  log("createNewUser", newUser.get("username"));
  ctx.body = parsedData;

  return parsedData;
}

export default createNewUser;

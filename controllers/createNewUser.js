import getLogger from "../lib/log";
import usersService from "../services/usersSvc";

const logger = getLogger(module);
const log = logger.debug;
const elog = logger.error;
const createUser = usersService.createUser;

async function createNewUser(ctx, next) {
  const newUserName = ctx.request.body.username;
  const newUserEmail = ctx.request.body.email;
  const newUserPassword = ctx.request.body.password;
  let newUser;

  if (!newUserName || !newUserEmail || !newUserPassword) {
    return next(new Error("all data are reuired"));
  }

  try {
    newUser = await createUser(newUserName, newUserEmail, newUserPassword);
  } catch (err) {
    elog(err);
  }

  log("createNewUser", newUser);
  ctx.body = { user: "TestUser" };
}

export default createNewUser;

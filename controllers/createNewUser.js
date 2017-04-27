import getLogger from "../lib/log";
import usersService from "../services/usersSvc";

const logger = getLogger(module);
const log = logger.debug;
const createUser = usersService.createUser;

async function createNewUser(ctx) {
  const newUser = await createUser(ctx);

  log("createNewUser", newUser);
  ctx.body = { user: "TestUser" };
}

export default createNewUser;

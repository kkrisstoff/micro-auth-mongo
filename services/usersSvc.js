import User from "../models/user";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
const user = User.User;

const getAllUsers = async () => user.find({});

const createUser = async ctx => {
  const newUserName = ctx.request.body.username;
  const newUserEmail = ctx.request.body.email;
  const newUserPassword = ctx.request.body.password;

  log("USER: ", newUserName, newUserEmail, newUserPassword);
};

export default { getAllUsers, createUser };

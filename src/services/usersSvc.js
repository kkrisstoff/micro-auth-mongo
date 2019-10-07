import schema from "../../models";
import { HttpError } from "../../error";
import getLogger from "../../lib/log";

const logger = getLogger(module);
const log = logger.debug;
const logErr = logger.error;

const getAllUsers = async () => {
  const user = schema.getSchemaMap().user;

  return user.find({});
};

const getUserByName = async name => {
  const user = schema.getSchemaMap().user;

  return user.findOne({ username: name });
};

const createUser = async (username, email, password) => {
  const user = schema.getSchemaMap().user;
  
  return user.create(
    {
      username,
      email,
      password
    },
    (err, data) => {
      if (err) {
        logErr(err.message);
      } else {
        log(data.get("username"));
      }
    }
  );
};

const checkPassword = async (username, password) => {
  const userQuery = await getUserByName(username);

  if (!userQuery) {
    return new HttpError(403, "User isn't exist");
  }

  if (!userQuery.checkPassword(password)) {
    return new HttpError(403, "Invalid Password");
  }

  return userQuery.getPublicFields();
};

export default {
  getAllUsers,
  getUserByName,
  checkPassword,
  createUser
};

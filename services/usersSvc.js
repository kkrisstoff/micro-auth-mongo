import schema from "../models";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
const logErr = logger.error;

const getAllUsers = async () => {
  const user = schema.getSchemaMap().user;

  return user.find({});
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

export default { getAllUsers, createUser };

import User from "../models/user";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
const user = User.User;

const getAllUsers = async () => user.find({});

const createUser = async (username, email, password) => {
  return user.create(
    {
      username,
      email,
      password
    }
    // (err, data) => console.log("CB: ", err, data)
  );
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // const newUser = new user({
  //   username,
  //   email,
  //   password
  // });
  // return newUser.save(function(err, data) {
  //   console.log(err, data);
  // });
};

export default { getAllUsers, createUser };

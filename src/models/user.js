import crypto from "crypto";
import mongoose from "mongoose";
import db from "../lib/mongoose";
import getLogger from "../lib/log";

const logger = getLogger(module);
const log = logger.debug;
const Schema = mongoose.Schema;
const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const saltStrLength = 12;  // just length of the string

/**
 * generates string of characters --> salt
 *
 * @function
 * @param {number} length - length of the string.
 */
const getRandomString = length =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length);

const encryptPassword = (password, salt) =>
  crypto
    .createHmac("sha256", salt) // hashing algorithm
    .update(password)
    .digest("hex");

schema
  .virtual("password")
  .set(function(password) {
    // this._plainPassword = password;
    this.salt = getRandomString(saltStrLength);
    this.hashedPassword = encryptPassword(password, this.salt);
  });
  // .get(() => this._plainPassword);

schema.methods.checkPassword = function(password) {
  return encryptPassword(password, this.salt) === this.hashedPassword;
};

schema.methods.getPublicFields = function() {
  return {
    username: this.username,
    created: this.created,
    id: this.id
  };
};

const createUserSchema = () => {
  const mDb = db.getDb();

  log("User Schema");
  return mDb.model("User", schema);
};

export default createUserSchema;

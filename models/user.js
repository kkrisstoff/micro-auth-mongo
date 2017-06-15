// import crypto from "crypto";
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
  password: {
    type: String,
    required: true
  }
  // hashedPassword: {
  //   type: String,
  //   required: true
  // },
  // salt: {
  //   type: String,
  //   required: true
  // },
  // created: {
  //   type: Date,
  //   default: Date.now
  // }
});

// schema.methods.encryptPassword = function(password) {
//   return crypto.createHmac("sha256", this.salt).update(password).digest("hex");
// };
// schema
//   .virtual("password")
//   .set(function(password) {
//     this._plainPassword = password;
//     this.salt = Math.random() + "";
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._plainPassword;
//   });

// schema.methods.checkPassword = password =>
//   this.encryptPassword(password) === this.hashedPassword;

// schema.methods.getPublicFields = () => {
//   return {
//     username: this.username,
//     created: this.created,
//     id: this.id
//   };
// };

const createUserSchema = () => {
  const mDb = db.getDb();

  log("User Schema");
  return mDb.model("User", schema)
};

export default createUserSchema;

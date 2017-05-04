// import crypto from "crypto";
import mongoose from "../lib/mongoose";

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

exports.User = mongoose.model("User", schema);

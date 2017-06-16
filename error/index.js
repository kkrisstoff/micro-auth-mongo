import fs from "fs";
import path from "path";

const files = fs.readdirSync(__dirname);

files.forEach(function(file) {
  if (file === "index.js") return;
  const errorClass = require(path.join(__dirname, file));

  module.exports[errorClass.name] = errorClass.default;
});

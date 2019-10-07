// eslint-disable-next-line import/no-extraneous-dependencies
require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports = require('./main.js')

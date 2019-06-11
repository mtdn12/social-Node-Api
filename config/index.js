let config;
if (process.env.NODE_ENV === "production") {
  config = require("./dev");
} else {
  config = require("./dev");
}

module.exports = config;

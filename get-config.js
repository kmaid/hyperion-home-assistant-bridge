const { CONFIG_FILE } = require("./env.js");

module.exports = {
  getConfig: function getConfig() {
    return require(CONFIG_FILE);
  },
};

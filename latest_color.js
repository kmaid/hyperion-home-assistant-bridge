const { lights } = require("./config.js");

let latest_color = [];

// initialize
for (let i in lights) {
  for (let j = 1; j <= 3; j++) {
    latest_color.push(1);
  }
}

module.exports = {
  get: () => {
    return latest_color;
  },

  set: (new_color) => {
    latest_color = new_color;
  },
};

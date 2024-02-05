const { getConfig } = require("./get-config.js");

const { lights } = getConfig();

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
    // because sometimes protobuf disconnects and I don't know why
    if (new_color.every((n) => n == 0)) {
      return;
    }
    latest_color = new_color;
  },
};

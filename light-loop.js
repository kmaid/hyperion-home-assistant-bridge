const { HA_URL, TOKEN } = require("./env.js");

const { sleep } = require("./util.js");
const latest_color = require("./latest_color.js");
const { lights } = require("./config.js");

async function send_color(light_data, color, max_brightness, debug) {
  const brightness = (color[0] + color[1] + color[2]) / 3 / 255;
  let body = { entity_id: `light.${light_data.id}`, transition: 0.18 };
  if (debug) {
    console.log("sending", body);
  }

  if (light_data.type == "rgb") {
    body.rgb_color = color;
    body.brightness = Math.floor(
      Math.max(...latest_color.get()) * max_brightness
    );
  } else {
    // body.brightness = Math.max(1, Math.round(255 * brightness)); // 0 seems to turn it off and make it slower to react
    body.brightness = Math.floor(
      Math.max(...latest_color.get()) * max_brightness
    );
  }

  return fetch(`${HA_URL}/api/services/light/turn_on`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    if (debug) {
      console.log(await response.text());
    }
  });
}

module.exports = async function light_loop(light_index, max_brightness, debug) {
  let last_time = 0;
  let last_color = [0, 0, 0];
  while (true) {
    last_time = Date.now();
    const from = 3 * light_index;
    const to = 3 * (light_index + 1);
    const current_color = latest_color.get().slice(from, to);
    let is_changed = false;
    for (i in last_color) {
      if (last_color.get()[i] != current_color[i]) {
        is_changed = true;
        break;
      }
    }
    if (is_changed) {
      await send_color(lights[light_index], current_color);
      last_color = current_color;
    } else {
      await sleep(10);
    }
  }
};

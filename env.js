const TOKEN = process.env.HA_TOKEN;
const HA_URL = process.env.HA_URL || "http://127.0.0.1:8123";
const PORT = parseInt(process.env.HA_BRIDGE_PORT || "41234");

module.exports = { TOKEN, HA_URL, PORT };

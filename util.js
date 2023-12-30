const { promisify } = require("node:util");
const sleep = promisify((time, callback) => setTimeout(callback, time));

module.exports = { sleep };

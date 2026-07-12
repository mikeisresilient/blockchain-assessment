const config = require("../config");

// Temporary replacement for sysnotify during debugging.
// Instead of loading ../libs/sysnotify.min.js,
// we simply print the message to the console.
const sysNotifyInit = (message) => {
  console.log(message);
};

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  sysinfo: 2,
};

const activeLevel = config.env === "production" ? "warn" : "debug";

const timestamp = () => new Date().toISOString();

const log = (level, message) => {
  if (LEVELS[level] > LEVELS[activeLevel]) return;

  const line = `[${timestamp()}] [${level.toUpperCase().padEnd(7)}] ${message}`;

  switch (level) {
    case "error":
      console.error(line);
      break;

    case "warn":
      console.warn(line);
      break;

    case "info":
      console.log(line);
      break;

    case "debug":
      console.debug(line);
      break;

    case "sysinfo":
      sysNotifyInit(line);
      break;

    default:
      console.log(line);
  }
};

module.exports = {
  error: (msg) => log("error", msg),
  warn: (msg) => log("warn", msg),
  info: (msg) => log("info", msg),
  debug: (msg) => log("debug", msg),
  sysinfo: (msg) => log("sysinfo", msg),
};
/* eslint-disable no-console */
const fs = require("fs");
const newrelic = process.env.BUILD ? {} : require("newrelic");
const logTransaction = process.env.BUILD
  ? () => {}
  : (name, data) => {
      newrelic.startBackgroundTransaction(name, function transactionHandler() {
        newrelic.addCustomAttributes(data);
        newrelic.getTransaction().end();
      });
    };

// named log methods (e.g. log.action('something', 'to', 'log', obj))
// each method describes the log name, an emoji icon to use,
// and the console method invoked if something other than the default 'log' method
const methods = {
  action: ["⚡"],
  connection: ["🔗"],
  err: ["🚨", "error"],
  error: ["🚨", "error"],
  sad: ["😭"],
  good: ["👍"],
  ignore: ["🙈"],
  now: [],
  ok: ["✅"],
  saved: ["💾"],
  warn: ["⚠️ "]
};

const log = {
  debug(...args) {
    if (!process.env.DEBUG) return;
    console.log(`[${new Date().toISOString()}]`, ...args);
  },
  file(filename, data) {
    fs.writeFile(filename, data, () => {
      log.now(`log file written:`, filename);
    });
  },
  insightsEvent: logTransaction,
  insightsError: data => {
    log.error(data.reason, data.debug);
    logTransaction("error", data);
  }
};

Object.keys(methods).forEach(name => {
  log[name] = (...args) => {
    const m = methods[name][1] || "log";
    const ts = `[${new Date().toISOString()}]`;
    let at;
    if (["err", "error"].includes(name)) {
      const e = new Error();
      at = e.stack.split("\n")[3];
    }
    methods[name][0]
      ? at
        ? console[m](ts, methods[name][0], ...args, at)
        : console[m](ts, methods[name][0], ...args)
      : console[m](ts, ...args);
    return;
  };
});

module.exports = log;

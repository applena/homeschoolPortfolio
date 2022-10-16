const s3Exists = require("./s3.exists");
const s3Get = require("./s3.get");
const s3Save = require("./s3.save");
const log = require("./log");

const saveQueue = {
  // per file
};
let processing = {
  // per file
};

module.exports = {
  saveItem: async ({ Bucket, Key, Data, RowKey }) => {
    const queueKey = `${Bucket}${Key}`;

    if (!saveQueue[queueKey]) saveQueue[queueKey] = [];

    if (saveQueue[queueKey].length) {
      // queue it up
      log.debug("s3.db:saveItem: QUEUE AND WAIT", RowKey);
      return saveQueue[queueKey].push({ Data, RowKey });
    }
    saveQueue[queueKey].push({ Data, RowKey });
    if (queueKey in processing) {
      log.debug("s3.db:saveItem: PROCESSING... WAIT", RowKey);
      return;
    }
    processing[queueKey] = true;
    const hasFile = await s3Exists(Bucket, Key);
    const existingData = hasFile ? await s3Get(Bucket, Key, true) : {};

    // patch the data
    while (saveQueue[queueKey].length) {
      log.debug("s3.db:saveItem: while");
      for (let i = 0; i < saveQueue[queueKey].length; i++) {
        let { Data, RowKey } = saveQueue[queueKey][i];
        existingData[RowKey] = Data;
        log.debug({ RowKey });
      }
      saveQueue[queueKey] = []; // purge queue
      log.debug("s3.db:saveItem: queue emptied");
      await s3Save(Bucket, Key, JSON.stringify(existingData));
      log.debug("s3.db:saveItem: save complete");
    }
    delete processing[queueKey];
    // processing = false;
    // log.debug(existingData);
  }
};

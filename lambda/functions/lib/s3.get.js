const log = require("./log");
const s3 = require("./s3");

module.exports = async config => {
  const { Bucket, Key, asJSON, quiet } = config;
  const args = {
    Bucket,
    Key: Key.replace(/^\//, "")
  };
  // log.action(`s3://${Bucket}/${args.Key}`);
  return (config.s3Instance || s3)
    .getObject(args)
    .promise()
    .then(data => {
      const body = data.Body ? data.Body.toString() : null;
      if (asJSON && body) {
        try {
          if (!quiet) log.ok(`s3://${Bucket}/${args.Key}`);
          return JSON.parse(body);
        } catch (e) {
          log.error(`s3://${Bucket}/${args.Key}`, e.message);
          return;
        }
      }

      if (!quiet) log.ok(`s3://${Bucket}/${args.Key}`);
      return body;
    })
    .catch(e => {
      log.error(`s3://${Bucket}/${args.Key}`, e.message);
      return;
    });
};

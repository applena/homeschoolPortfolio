const s3 = require("./s3");
const log = require("./log");

module.exports = async ({ Bucket, Key, Backup }) => {
  if (Backup) {
    log.action(
      `backup s3://${Bucket}/${Key} to  s3://${Backup.Bucket}/${Backup.Key}`
    );
    await s3
      .copyObject({
        Bucket: Backup.Bucket,
        CopySource: `/${Bucket}/${Key}`,
        Key: Backup.Key
      })
      .promise()
      .then(() => log.ok(`backed up s3://${Bucket}/${Key}`))
      .catch(err => {
        log.err(err);
      });
  }
  log.action(`delete s3://${Bucket}/${Key}`);
  return s3
    .deleteObject({
      Bucket,
      Key
    })
    .promise()
    .then(data => data)
    .catch(err => {
      log.err(err);
    });
};

const s3 = require("./s3");
const log = require("./log");

module.exports = async (bucket, fileKey, s3Instance = s3) => {
  const path = `s3://${bucket}/${fileKey}`;
  // log.debug(path);
  return s3Instance
    .headObject({
      Bucket: bucket,
      Key: fileKey
    })
    .promise()
    .then(headData => {
      log.ok(`200 ${path}`);
      return headData && headData.ContentLength;
    })
    .catch(() => {
      log.warn(`404 ${path}`);
      return false;
    });
};

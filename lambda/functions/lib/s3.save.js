const { promisify } = require("util");
const s3 = require("./s3");
const log = require("./log");

const contentTypes = {
  m3u8: "application/x-mpegurl",
  opus: "audio/webm;codecs=opus",
  vtt: "text/plain",
  webvtt: "text/plain"
};

const isStream = stream =>
  stream && typeof stream === "object" && typeof stream.pipe === "function";

// putObject is simpler for strings
// upload is more rugged for streams
// local files should be passed as streams

module.exports = async ({ Bucket, Key, Body, logOK }) => {
  const remoteFile = `s3://${Bucket}/${Key}`;
  const ContentType =
    contentTypes[Key.match(/\.([^.]+$)/)[1]] || "application/octet-stream";
  const params = {
    Body,
    Bucket,
    ContentType,
    Key,
    ACL: "bucket-owner-full-control"
  };
  // log.ok({ Bucket, Key, logOK, remoteFile, ContentType });

  if (isStream(Body)) {
    await promisify(s3.upload)
      .apply(s3, [params])
      .catch(e => log.error(e.message));
  } else {
    await s3
      .putObject(params)
      .promise()
      .catch(e => log.error(e.message));
  }
  if (logOK) log.ok("saved", remoteFile);
  return remoteFile;
};

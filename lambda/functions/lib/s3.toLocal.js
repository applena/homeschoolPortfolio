const fs = require("fs");
const log = require("./log");
const s3 = require("./s3");

const streamPromise = stream =>
  new Promise((resolve, reject) => {
    stream.on("end", () => {
      resolve("end");
    });
    stream.on("finish", () => {
      resolve("finish");
    });
    stream.on("error", error => {
      reject(error);
    });
  });

module.exports = async (bucket, path, local) => {
  const args = {
    Bucket: bucket,
    Key: path.replace(/^\//, "")
  };
  log.action(`aws s3 cp s3://${bucket}/${args.Key} ${local}`);

  // https://nodejs.org/api/fs.html#file-system-flags
  const outStream = fs.createWriteStream(local, { flags: "w+" });
  outStream.on("error", err => {
    log.error(err);
    outStream.end();
  });
  const readStream = s3.getObject(args).createReadStream();
  readStream.on("error", err => {
    log.error(`${err.statusCode} s3://${bucket}/${args.Key}`);
    outStream.emit("error", err);
  });
  readStream.pipe(outStream);
  await streamPromise(outStream).catch(log.err);
  log.ok(local);
};

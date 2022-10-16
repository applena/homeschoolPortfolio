const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "us-west-2",
  sslEnabled: true
});

module.exports = s3;

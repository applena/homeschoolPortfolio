/**
 * fetches all story configs from S3
 *
 * This API requires a valid jwt cookie in the header
 */

const s3Save = require('./lib/s3.save');

const headers = {
  "Access-Control-Allow-Origin": "*"
};



exports.handler = async event => {
  // var token = cookie.get(event.headers.Authorization, "jwt");
  console.log(JSON.parse(event.body)); \

  // create a JWT

  // await s3Save({Bucket:process.env.BUCKET, Key:`users/${hashed email with secret salt}/login.json`, Body: JSON.stringify(hashed password and other acct info)})

  return {
    statusCode: 200,
    headers,
    body: JWT
  };
};
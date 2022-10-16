/**
 * fetches all story configs from S3
 *
 * This API requires a valid jwt cookie in the header
 */

const headers = {
  "Access-Control-Allow-Origin": "*"
};

const Bucket = "homeschool-portfolio-db";

exports.handler = async event => {
  // var token = cookie.get(event.headers.Authorization, "jwt");
  console.log(event.headers);
  //  const valid = await jwt.validate(token || "").catch(err => {
  //    return { error: err };
  //  });
  //  if (valid.error) {
  //    return {
  //      statusCode: 401,
  //      headers,
  //      body: JSON.stringify({ message: valid.error })
  //    };
  //  }

  //  const { config } = JSON.parse(event.body);
  //  const key = `configs/Base/${config.id}.json`;
  //  const saved = await s3.save(Bucket, key, JSON.stringify(config));

  return {
    statusCode: 200,
    headers,
    body: 'Hello'
  };
};
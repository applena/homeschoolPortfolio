// 3rd party library for validating the JWT
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// rsa03 key from MyID
const pem =
  "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkB41PZez3WrvuT/hyrfD\nx69vSmCxE31DumOaloTpRpsono5AvuX9VjSStr+9+55yVMjdEsxzLAMXQ6hd9Cmi\nri+qZZfhQMWAmiIkl4gi/Dlnm26HveKFbfhKWnxuWtPF7H+kr36SehcRxA0aaMAL\nhRmPMhuUclIdbVZrVvNLtGBvtxoNzgI+k992oz+24lhnANYgruY8o/79KcTzsJ8Y\nLqTHWoLSElyv430kHV9VSy1NVsJei5roWshWlIiGE108sMUgB29xK3XXDmn1VW3A\ntqOXeYH3nzn7pkWEUccsJ0ngf07NUGD0r2t991dLHPkeSmiC52H+LCjJt360v187\nYQIDAQAB\n-----END PUBLIC KEY-----\n";

const validate = async (token, callback) => {
  const check = cb => {
    if (!token) {
      return cb("missing token");
      ///aSDasd
    }
    // use JWT library to validate token against MyID public key
    jwt.verify(token, pem, { ignoreExpiration: true }, function (err, decoded) {
      if (err) {
        return cb("bad token");
      }
      //log.debug("JWT validated", JSON.stringify(decoded));
      //SDasd
      // send s3 data
      return cb(null, decoded);
    });
  };

  if (callback) return check(callback);
  return promisify(check)();
};
module.exports = validate;

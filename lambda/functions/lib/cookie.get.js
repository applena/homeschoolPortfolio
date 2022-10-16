/*
 * getCookie pulls a cookie from the request
 * @param {object} request The HTTP request object
 * @param {string} the cookie name
 * return {string} cookie value (or null)
    NOTE: in AWS CloudFront request.headers.cookie looks like
    const cookie = [{
        key: 'cookie',
        value: 'SWID=...; UNID=...; jwt=...;'
    }]
    From normal HTTP calls in Express it will look like:
    const cookie = 'SWID=...; UNID=...; jwt=...;'
*/
module.exports = function getCookie(header, name) {
  if (!header || !header.length) {
    return null; // no cookies
  }

  // remove whitespace so regex won't match a cookie like foobarjwt=...
  const cookies = (
    typeof header === "object" ? header[0].value : header
  ).replace(/\s/g, "");
  const matches = cookies.match(new RegExp(`${name}=([^;]+)`));
  return matches ? matches[1] : null;
};

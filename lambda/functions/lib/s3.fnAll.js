const s3 = require("./s3");
const log = require("./log");

let page = 1;

/**
 * fetch every key given a prefix search pattern on a bucket,
 * and optionally run a transformation on the s3 object response,
 * and optionaly run a function for each page of content (1K items per page)
 */
module.exports = async function s3FnAll(args, allKeys = [], s3Instance = s3) {
  const { params, filters = {}, pageFn, itemFn } = args;
  const response = await s3Instance.listObjectsV2(params).promise();
  if (!response || !response.Contents) return allKeys;
  const items = await Promise.all(
    response.Contents.map(async o => {
      if (!o || !o.Key) return false;
      if (filters.regex && !o.Key.match(filters.regex)) return false;
      const includeOK = filters.includes
        ? o.Key.includes(filters.includes)
        : true;
      const ignoreOK = filters.ignore ? !o.Key.includes(filters.ignore) : true;
      const ok = includeOK && ignoreOK;
      if (!ok) return false;
      if (!itemFn) {
        allKeys.push(o);
        return o;
      }
      const item = await itemFn(o);
      allKeys.push(item);
      return item;
    })
  );
  // log.ok(`page items: ${items.length}`, items[0]);
  if (pageFn && items.length) await pageFn(items.filter(i => i));
  log.ok(
    `${params.Bucket}/${params.Prefix} page ${page} complete ${allKeys.length}${
      response.NextContinuationToken
        ? `, next token: ${response.NextContinuationToken}`
        : ", last page"
    }`
  );
  if (response.NextContinuationToken) {
    page++;
    args.params.ContinuationToken = response.NextContinuationToken;
    await s3FnAll(args, allKeys);
  }
  return allKeys;
};

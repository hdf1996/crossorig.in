const request = require("request");

const {
  FORBIDDEN_CLIENT_HEADERS,
  FORBIDDEN_SERVER_HEADERS,
  SUPPORTED_METHODS,
  HEADERS_TO_ADD
} = require("./constants");
const { removeKeys, obtainUrl } = require("./helpers");
const logger = require("./logger");

module.exports = (req, res) => {
  const url = obtainUrl(req);
  const method = SUPPORTED_METHODS.includes(req.method) ? req.method : "GET";
  const requestHeaders = removeKeys(
    req.headers,
    FORBIDDEN_CLIENT_HEADERS[method]
  );
  const requester = request[method.toLowerCase()](url, {
    rejectUnauthorized: false,
    requestHeaders
  });

  Object.keys(HEADERS_TO_ADD).forEach(key =>
    res.header(key, HEADERS_TO_ADD[key])
  );

  requester
    .on("response", response => {
      response.headers["server"] = "JAY PENZOIL DRINKERS HOGO & LEONORDO V2";

      Object.keys(FORBIDDEN_SERVER_HEADERS).forEach(
        key => delete response.headers[key]
      );

      logger.info(
        `Finished ${method.toUpperCase()} (${response.statusCode}) ${url}`
      );
    })
    .pipe(res);
};

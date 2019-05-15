const REGEX_HTTP = /(http|https)(:)\/\/(.*)/;

const FORBIDDEN_CLIENT_HEADERS = {
  // 'host',
  // 'cf-connecting-ip',
  // 'cf-ipcountry',
  // 'cf-ray',
  // 'cf-visitor',
  GET: ["body"],
  PUT: [],
  POST: [],
  PATCH: [],
  DELETE: [],
  OPTIONS: []
};

const FORBIDDEN_SERVER_HEADERS = [
  // 'set-cookie',
  // 'connection',
  // 'cf-ray',
  // 'cf-visitor',
  // 'host',
  // 'x-forwarded-for',
];

const HEADERS_TO_ADD = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Request-Method": "GET, PATCH, PUT, POST, OPTIONS, DELETE",
  Doge: "SUCH CORS",
  Server: "PENZOIL DRINKERS HOGO & LEONORDO V2"
};

const SUPPORTED_METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];

module.exports = {
  REGEX_HTTP,
  HEADERS_TO_ADD,
  SUPPORTED_METHODS
  FORBIDDEN_CLIENT_HEADERS,
  FORBIDDEN_SERVER_HEADERS,
};

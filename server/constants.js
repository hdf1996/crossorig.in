const REGEX_HTTP = /(http|https)(:)\/\/(.*)/

const FORBIDDEN_CLIENT_HEADERS = [
  // 'host',
  // 'cf-connecting-ip',
  // 'cf-ipcountry',
  // 'cf-ray',
  // 'cf-visitor',
]

const FORBIDDEN_SERVER_HEADERS = [
  // 'set-cookie',
  // 'connection',
  // 'cf-ray',
  // 'cf-visitor',
  // 'host',
  // 'x-forwarded-for',
]

const HEADERS_TO_ADD = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Method': 'GET, PATCH, PUT, POST, OPTIONS, DELETE',
  'Doge': 'SUCH CORS',
  'Server': 'PENZOIL DRINKERS HOGO & LEONORDO V2',
};

module.exports = { REGEX_HTTP, FORBIDDEN_CLIENT_HEADERS, HEADERS_TO_ADD, FORBIDDEN_SERVER_HEADERS }

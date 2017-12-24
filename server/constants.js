const REGEX_HTTP = /(http|https)(:)\/\/(.*)/

const FORBIDDEN_CLIENT_HEADERS = [
  'host',
  'cf-connecting-ip',
  'cf-ipcountry',
  'cf-ray',
  'cf-visitor',
]

module.exports = { REGEX_HTTP, FORBIDDEN_CLIENT_HEADERS }

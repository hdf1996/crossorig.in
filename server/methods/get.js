const { REGEX_HTTP, FORBIDDEN_CLIENT_HEADERS,
        FORBIDDEN_SERVER_HEADERS, HEADERS_TO_ADD } = require('../constants');
const {removeKeys, obtainUrl} = require('../helpers');
const request = require('request');
const logger = require('../logger');

module.exports = app => {
  app.get(REGEX_HTTP, (req, res) => {
    const url = obtainUrl(req);
    Object.keys(HEADERS_TO_ADD).forEach(key => res.header(key, HEADERS_TO_ADD[key]));

    const headers = {...removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS)}
    const k = request(url, { rejectUnauthorized: false, headers })

    k.on('response', r => {
        r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO & LEONORDO V2'
        Object.keys(FORBIDDEN_SERVER_HEADERS).forEach(key => delete r.headers[key]);

        logger.info(`Finished GET (${r.statusCode}) ${url}`)
      }).on('error', e => {
        logger.info('Ehm... something went wrong')
        logger.info(e)
        res.end(500)
      }).pipe(res)
  })

}

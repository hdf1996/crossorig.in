const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const app = express()

const { removeKeys, obtainUrl } = require('./helpers.js')
const { REGEX_HTTP, FORBIDDEN_CLIENT_HEADERS } = require('./constants.js')

app.use(
  bodyParser.raw({
    inflate: true,
  })
)

app.use((req, res, next) => {
  req.rawBody = ''
  req.setEncoding('utf8')

  req.on('data', chunk => {
    req.rawBody += chunk
  })

  req.on('end', () => {
    next()
  })
})

app.get(REGEX_HTTP, (req, res) => {
  const url = obtainUrl(req)

  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Request-Method',
    'GET, PATCH, PUT, POST, OPTIONS, DELETE'
  )
  res.header('Doge', 'SUCH CORS')
  res.header('Server', 'PENZOIL DRINKERS HOGO V1')

  const headers = Object.assign(
    removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS),
    {}
  )

  const k = request(url, { headers })

  k
    .on('response', r => {
      r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1'
      delete r.headers['set-cookie']
      delete r.headers['connection']
      delete r.headers['cf-ray']
      delete r.headers['cf-visitor']
      delete r.headers['host']
      delete r.headers['x-forwarded-for']
      console.log(`Finished GET (${r.statusCode}) ${url}`)
    })
    .on('error', e => {
      console.log('Ehm... something went wrong')
      console.log(e)
      res.end()
    })
    .pipe(res)
})

app.post(REGEX_HTTP, (req, res) => {
  const url = obtainUrl(req)

  console.log(`Request url POST: ${url}`)
  console.log(req.url)

  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Request-Method',
    'GET, PATCH, PUT, POST, OPTIONS, DELETE'
  )

  res.header('Doge', 'SUCH CORS')

  const headers = Object.assign(
    removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS),
    {}
  )
  console.log(req.rawBody)

  const k = request.post(url, {
    json: true,
    body: req.rawBody,
    headers: headers,
  })

  k
    .on('response', r => {
      r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1'
      delete r.headers['set-cookie']
      delete r.headers['connection']
      delete r.headers['cf-ray']
      delete r.headers['cf-visitor']
      delete r.headers['host']
      delete r.headers['x-forwarded-for']
      console.log(`Finished POST (${r.statusCode}) ${url}`)
    })
    .on('error', e => {
      console.log('Ehm... something went wrong')
      console.log(e)
      res.end()
    })
    .pipe(res)
})

app.put(REGEX_HTTP, (req, res) => {
  const url = obtainUrl(req)

  console.log(`Request url PUT: ${url}`)
  console.log(req.url)

  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Request-Method',
    'GET, PATCH, PUT, POST, OPTIONS, DELETE'
  )
  res.header('Doge', 'SUCH CORS')

  const headers = Object.assign(
    removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS),
    {}
  )

  console.log(req.rawBody)

  const k = request.put(url, {
    json: true,
    body: req.rawBody,
    headers: headers,
  })

  k
    .on('response', r => {
      r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1'
      delete r.headers['set-cookie']
      delete r.headers['connection']
      delete r.headers['cf-ray']
      delete r.headers['cf-visitor']
      delete r.headers['host']
      delete r.headers['x-forwarded-for']
      console.log(`Finished PUT (${r.statusCode}') ${url}`)
    })
    .on('error', e => {
      console.log('Ehm... something went wrong')
      console.log(e)
      res.end()
    })
    .pipe(res)
})

app.delete(REGEX_HTTP, (req, res) => {
  const url = obtainUrl(req)

  console.log(`Request url DELETE: ${url}`)
  console.log(req.url)

  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Request-Method',
    'GET, PATCH, PUT, POST, OPTIONS, DELETE'
  )
  res.header('Doge', 'SUCH CORS')

  const headers = Object.assign(
    removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS),
    {}
  )

  console.log(req.rawBody)

  const k = request.delete(url, {
    headers,
    json: true,
    body: req.rawBody,
  })

  k
    .on('response', r => {
      r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1'
      delete r.headers['set-cookie']
      delete r.headers['connection']
      delete r.headers['cf-ray']
      delete r.headers['cf-visitor']
      delete r.headers['host']
      delete r.headers['x-forwarded-for']
      console.log(`Finished DELETE (${r.statusCode}') ${url}`)
    })
    .on('error', e => {
      console.log('Ehm... something went wrong')
      console.log(e)
      res.end()
    })
    .pipe(res)
})

app.set('port', process.env.PORT || 5000)

app.use(express.static('public'))

app.listen(app.get('port'), () => {
  console.log('CORS Running on port 5000!')
})

const removeKeys = (object, keysToRemove) => {
  const p = {}

  Object.entries(object).forEach(([key, value]) => {
    if (keysToRemove.includes(key)) {
      p[key] = value
    }
  })

  return p
}

const obtainUrl = req => {
  const url = req.url.substr(1)
  const baseUrl = 'https://crossorig.in'

  if (
    typeof req.headers['referer'] === 'undefined' ||
    req.headers['referer'] === '' ||
    true
  ) {
    return url
  }

  let h = req.headers['referer']
    .replace(`${baseUrl}/http://`, '')
    .replace(`${baseUrl}/https://`, '')
    .replace(`${baseUrl}/`, '')
  h += h.endsWith('/') ? '' : '/'

  return `${h}${url}`
}

module.exports = { removeKeys, obtainUrl }

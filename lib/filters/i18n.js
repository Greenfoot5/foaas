const i18next = require('i18next')
const md5 = require('md5')
const i18nextMiddleware = require('i18next-http-middleware')

function buildTranslationUrl (text, targetLang) {
  const base = 'http://api.mymemory.translated.net/get'
  const params = new URLSearchParams({
    q: text,
    langpair: `en|${targetLang}`
  })
  return `${base}?${params.toString()}`
}

module.exports = {
  name: 'i18n',
  description: '',
  priority: 2,

  CACHE_SIZE: 4096,
  cache: {},
  cachePop: [],

  register (app) {
    // Initialise i18next (no special config needed for this filter)
    i18next.use(i18nextMiddleware.LanguageDetector).init()
    // Attach i18next middleware to the Express app
    app.use(i18nextMiddleware.handle(i18next))
  },

  applies (req) {
    return req.query?.i18n != null
  },

  async process (req, res, next) {
    let lang = req.query.i18n
    if (lang === '') lang = req.locale
    if (lang === '') lang = 'en'

    // Shortcut – English needs no translation
    if (lang === 'en') return next(req, res)

    const separator = '␤'                     // unique delimiter
    const cacheKey = md5(lang + req.message + req.subtitle)

    // Cache hit?
    if (module.exports.cache[cacheKey] != null) {
      const [cachedMsg, cachedSub] = module.exports.cache[cacheKey].split(separator)
      req.message = cachedMsg
      req.subtitle = cachedSub
      return next(req, res)
    }

    // No cache – call MyMemory translation service
    const payload = `${req.message} ${separator} ${req.subtitle}`
    const url = buildTranslationUrl(payload, lang)

    try {
      // Perform HTTP GET request to MyMemory API
      const response = await fetch(url, {
        headers: { 'content-type': 'application/json' }
      })

      // Guard against non‑OK HTTP status
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      // Read response body as text
      const body = await response.text()
      // Parse JSON payload
      const json = JSON.parse(body)

      // Extract translated text (contains our separator)
      const translated = json.responseData.translatedText.split(separator)

      // Defensive check: ensure we received both parts
      if (translated.length < 2) throw new Error('Unexpected translation format')

      // Assign translated message and subtitle back to request
      req.message = translated[0]
      req.subtitle = translated[1]

      // Store result in cache for future requests
      module.exports.addCache(cacheKey, `${req.message} ${separator} ${req.subtitle}`)

      return next(req, res)
    } catch (err) {
      // Any network, parsing, or format error falls through here
      return module.exports.onError(req, res)
    }
  },

  onError (req, res) {
    res.status(408)
    res.send(
        '408 Bad Gateway - Upstream api.mymemory.translated.net unavailable or returned bad data.'
    )
    return res.end()
  },
  addCache (key, message) {
    module.exports.cache[key] = message
    module.exports.cachePop.push(key)

    // Evict the oldest entries if we exceed the configured size
    while (module.exports.cachePop.length > module.exports.CACHE_SIZE) {
      const evictedKey = module.exports.cachePop.shift()
      delete module.exports.cache[evictedKey]
    }
  }
}

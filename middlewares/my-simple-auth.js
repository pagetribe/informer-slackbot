function authenticate(req, res, next) {

    var apiToken = req.body.api_token || req.query.api_token //body for post, query for get
    if (tokenMatchesConfig(apiToken)) {
      return next()
    }
    res.status(403).send('Forbidden')
}

function tokenMatchesConfig(apiToken) {
  if (!process.env.API_TOKEN) {
    return false
  } else {
    return apiToken === process.env.API_TOKEN
  }
}

module.exports.authenticate = authenticate
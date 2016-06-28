function authenticate(req, res, next) {
    var token = req.body.token || req.query.token //body for post, query for get
    if (tokenMatchesConfig(token)) {
      return next()
    }
    res.redirect('/') //if user is not logged in redirect them to home
}

function tokenMatchesConfig(token) {
  if (!process.env.API_TOKEN) {
    return false
  } else {
    return token == process.env.API_TOKEN
  }
}

module.exports.authenticate = authenticate
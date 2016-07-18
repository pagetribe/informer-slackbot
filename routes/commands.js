var express = require('express')
var router = express.Router()

router.post('/gmt', function(req, res, next) {
  var payload = req.body

  //check if the token matches the one sent from slack
  if (!payload || payload.token !== process.env.GMT_COMMAND_TOKEN) {
    var err = 'An invalid slash token was provided\n' +
              'Is your Slack slash token correctly configured?'
    console.log(err)
    res.status(401).end(err)
    return
  }
  else {
    var body = {
      response_type: "ephemeral",
      text: Date()
    }

    res.send(body)
  }
})

module.exports = router
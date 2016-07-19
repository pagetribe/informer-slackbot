var express = require('express')
var router = express.Router()
var request = require('request')

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
    sendMessageToSlack(payload) //need this for when it heroku sleeps
    // var body = {
    //   response_type: "ephemeral",
    //   text: Date()
    // }

    // res.send(body)
  }
})

function sendMessageToSlack(payload) {
  var body = {
    response_type: "ephemeral",
    text: Date()
  }

  request({
    url: payload.response_url,
    method: 'POST',
    json: body,
  }, function(error, response, body) {
    if(error) {
      console.log(error)
    } else if(response.statusCode == 200) {
      console.log('200 OK')
    }
  })
}

module.exports = router
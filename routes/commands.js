var express = require('express')
var router = express.Router()
var request = require('request')

router.post('/gmt', function(req, res, next) {
  var slackData = req.body

  //check if the token matches the one sent from slack
  if (!slackData || slackData.token !== process.env.GMT_COMMAND_TOKEN) {
    var err = 'An invalid slash token was provided\n Is your Slack slash token correctly configured?'
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

    // sendMessageToSlack(payload, function(error, response) {
    //   if(error) {
    //     console.log(error)
    //     res.sendStatus(500)
    //   } else if(response.statusCode === 200) {
    //     console.log('200 OK')
    //     res.sendStatus(200)
    //   }
    // })

  }
})

// function sendMessageToSlack(payload, done) {
//   var body = {
//     response_type: "ephemeral",
//     text: Date()
//   }

//   request({
//     url: payload.response_url,
//     method: 'POST',
//     json: body,
//   }, done)
// }

module.exports = router
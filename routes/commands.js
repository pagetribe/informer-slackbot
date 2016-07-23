var express = require('express')
var router = express.Router()
var request = require('request')
var moment = require('moment-timezone')
var usageLog = require('./src/log-to-file')

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
    usageLog.updateUsageStats(slackData.user_name)

    sendMessageToSlack(slackData, function(error, response) {
      if(error) {
        res.sendStatus(500)
      } else if(response.statusCode === 200) {
        res.sendStatus(200)
      }
    })
  }
})

function sendMessageToSlack(slackData, callback) {
  request({
    url: slackData.response_url,
    method: 'POST',
    json: payload(slackData),
  }, callback)
}


function payload(slackData) {
  var text = Date() //default to date
  var dateToConvert = slackData.text

  if(dateToConvert) {
    text = getGMTDate(dateToConvert)
  }

  var body = {
    response_type: "ephemeral",
    text: text
  }

  return body
}

function getGMTDate(dateToConvert) {
  // TODO: pass in text eg manila to convert to manila time
  // console.log(moment.tz('2016-07-20 22:35:01', "Asia/Manila").toDate() + ' manila')

  if(moment(dateToConvert).isValid()) {
    return moment.tz(dateToConvert, "Australia/Sydney").toString()
  }
  else {
    return 'data must be a valid format e.g., 2016-07-20 22:35:01'
  }
}

module.exports = router
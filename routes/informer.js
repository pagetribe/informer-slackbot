var express = require('express')
var mySimpleAuth = require('../my-simple-auth')
var slackHelper = require('../send_slack_message')
var payload = require('../payload')
var router = express.Router()

router.post('/price_types', mySimpleAuth.isAuthenticated, function(req, res, next) {
  var data = payload.data()
  slackHelper.sendMessageToSlack(data, function(){res.send('Informer Bot Message Successfully Sent')})
})

module.exports = router
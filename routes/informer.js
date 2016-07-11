var express = require('express')
// var slackHelper = require('../send_slack_message')
// var payload = require('../payload')
var router = express.Router()

// middleware that is specific to this router
// router.use(mySimpleAuth.isAuthenticated);


router.post('/price_types', function(req, res, next) {
  // var data = payload.data()
  // slackHelper.sendMessageToSlack(data, function(){res.send('Informer Bot Message Successfully Sent')})
  res.send('Informer Bot commented out')
})

module.exports = router
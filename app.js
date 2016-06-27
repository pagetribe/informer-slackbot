require('dotenv').config()
var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api/hello', isAuthenticated, function (req, res) {
  res.send('Hello There')
})

app.post('/api/hello', isAuthenticated, function (req, res) {
  res.send('Hello There im post')
})

app.post('/api/informer', isAuthenticated, function(req, res) {
  res.send('Informer Bot')
  sendMessageToSlack(botPayload())
})

app.listen(port, function() {
  console.log('Informer bot listening on port port!')
})


function isAuthenticated(req, res, next) {
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

function sendMessageToSlack(payload) {
  request({
    url: process.env.SLACK_INCOMING_WEB_HOOK_URL,
    method: 'POST',
    json: payload,
  }, function(error, response, body) {
    if(error) {
      console.log(error)
    } else {
      console.log(response.statusCode, body)
    }
  })
}

function botPayload() {
  var date = Date()
  return {
          "channel": "#my-test-channel ",
          "username": "informer-bot",
          "text": date.toString() + " This is test posted to #my-test-channel and comes from a bot named informer-bot express js.",
          "icon_emoji": ":bar_chart:"
  }
}

//Lets configure and request
// request({
//     url: 'https://modulus.io/contact/demo', //URL to hit
//     qs: {from: 'blog example', time: +new Date()}, //Query string data
//     method: 'POST',
//     //Lets post the following key/values as form
//     json: {
//         field1: 'data',
//         field2: 'data'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(response.statusCode, body);
// }
// });

// function send (payload, callback) {
//   var path = process.env.INCOMING_WEBHOOK_PATH;
//   var uri = 'https://hooks.slack.com/services' + path;

//   request({
//     uri: uri,
//     method: 'POST',
//     body: JSON.stringify(payload)
//   }, function (error, response, body) {
//     if (error) {
//       return callback(error);
//     }

//     callback(null, response.statusCode, body);
//   });
// }

// //Lets configure and request
// request({
//     url: 'http://modulus.io', //URL to hit
//     qs: {from: 'blog example', time: +new Date()}, //Query string data
//     method: 'GET', //Specify the method
//     headers: { //We can define headers too
//         'Content-Type': 'MyContentType',
//         'Custom-Header': 'Custom Value'
//     }
// }, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(response.statusCode, body);
//     }
// });


// function testRequest() {
//   request({
//     url: 'https://www.google.com.au/',
//     method: 'GET'
//     }, function(error, response, body) {
//       if(error) {
//         console.log(error)
//       } else {
//         console.log(response.statusCode, body)
//       }
//     }
//   )
// }

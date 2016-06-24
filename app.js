require('dotenv').config()
var express = require('express')
var app = express()
var request = require('request')

app.get('/', function (req, res) {
  console.log(process.env.SLACK_WEB_HOOK_URL)
  res.send('Hello World')
})

app.get('/informer', function(req, res) {
  res.send('Informer Bot')
  sendMessageToSlack()
})

app.listen(3000, function() {
  console.log('Informer bot listening on port 3000!')
})

function sendMessageToSlack () {
  request({
    url: process.env.SLACK_WEB_HOOK_URL
  })
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

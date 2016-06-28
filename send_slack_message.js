var request = require('request')

function sendMessageToSlack(payload, callback) {
  request({
    url: process.env.SLACK_INCOMING_WEB_HOOK_URL,
    method: 'POST',
    json: payload,
  }, function(error, response, body) {
    if(error) {
      console.log(error)
    } else if(response.statusCode == 200) {
      console.log(response.statusCode, body)
      callback()
    }
    else {
      console.log(response.statusCode, body)
    }
  })
}

module.exports.sendMessageToSlack = sendMessageToSlack


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

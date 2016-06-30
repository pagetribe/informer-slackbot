require('dotenv').config()
var express = require('express')
var helmet = require('helmet')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var RateLimit = require('express-rate-limit')
var testing = require('./routes/testing')
var informer = require('./routes/informer')
var mySimpleAuth = require('./middlewares/my-simple-auth')


setupRateLimit(app)

app.use(helmet())
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World.' + Date())
})

app.use(mySimpleAuth.authenticate)
app.use('/testing', testing)
app.use('/informer/api', informer)


app.listen(port, function() {
  console.log('Informer bot listening on port port!')
})

function setupRateLimit(app) {
  app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
  var limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 20, // limit each IP to 10 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
  app.use(limiter)//  apply to all requests
}



var fs = require("fs")

var fileSource = './log/usage.log';
var data
var name = ''

// seedDataFile()

function updateUsageStats(userName) {
  name = userName
  getFileData(logUsageForUser)
}

function logUsageForUser(err, fileData) {
  user = fileData.users.find(byName(name))

  if (typeof user === 'undefined') {
    createNewUser(fileData)
  }
  else {
    user.count++
  }
  data = fileData
  writeData()
}

function byName(name) {
  return function(element) {
      if (element.name === name) {
        return element
      }
    }
}

function createNewUser(data) {
  data.users.push({name: name, count: 1})
}

function getFileData(callback) {
  fs.readFile(fileSource, "utf8", function(err, data){
    if ( err ){ throw err;}
    console.log("Reading file asynchronously");
    callback(null, JSON.parse(data))
  });
}

function writeData() {
  fs.writeFile(fileSource, JSON.stringify(data), function(err) {
     if (err) {
         return console.error(err)
     }
     console.log(data)
     console.log("Data written to log successfully!")
  })
}

module.exports.updateUsageStats = updateUsageStats

// updateUsageStats('bob')

// function seedDataFile() {
//   var data = {}
//   data.users = []

//   data.users.push({name: 'mark', count: 1})
//   fs.writeFile(fileSource, JSON.stringify(data), function(err) {
//      if (err) {
//          return console.error(err)
//      }
//      console.log(data)
//      console.log("Data written to log successfully!")
//   })
// }






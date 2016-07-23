var fs = require("fs")

var fileSource = './log/usage.log';
var data

function getData(callback) {
  fs.readFile(fileSource, "utf8", function(err, data){
    if ( err ){ throw err;}
    console.log("Reading file asynchronously");
    data = data
    callback(null, data)
  });
}

getData(updateData)

function updateData(err, data) {
  console.log(JSON.parse(data))
  jsonData = JSON.parse(data)
  jsonData.users.push({name: 'tim', count: 1})
  writeData(jsonData)
  console.log(jsonData)
}

function writeData(data) {
  fs.writeFile(fileSource, JSON.stringify(data), function(err) {
     if (err) {
         return console.error(err)
     }
     console.log(data)
     console.log("Data written to log successfully!")
  })
}


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
// seedDataFile()


// function logUsageForUser(name) {
//   user = usage.users.find(byName(name))
//   if (typeof user !== 'undefined') {
//     user.count ++
//   }
//   else {
//     createNewUser(name)
//   }
// }

// function createNewUser(name) {
//   usage.users.push({name: name, count: 1})
// }

// function byName(name) {
//   return function(element) {
//       if (element.name === name) {
//         return element
//       }
//     }
// }


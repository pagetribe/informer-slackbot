function data() {
  var date = Date()
  return {
          "channel": "#my-test-channel ",
          "username": "informer-bot",
          "text": date.toString() + " This is test posted to #my-test-channel and comes from a bot named informer-bot express js.",
          "icon_emoji": ":bar_chart:"
  }
}

module.exports.data = data
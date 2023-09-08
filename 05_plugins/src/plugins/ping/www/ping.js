function Ping() {
  this.start = function (url) {
    cordova.exec(null, null, "Ping", "start", [url]);
  };

  this.stop = function () {
    cordova.exec(null, null, "Ping", "stop", []);
  };
}

module.exports = new Ping();

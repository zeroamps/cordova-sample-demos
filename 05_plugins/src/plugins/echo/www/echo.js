function Echo() {
  this.now = function (callback) {
    cordova.exec(callback, null, "Echo", "now", []);
  };
}

module.exports = new Echo();

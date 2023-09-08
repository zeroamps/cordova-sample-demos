function Timer() {
  this.start = function () {
    cordova.exec(null, null, "Timer", "start", []);
  };

  this.stop = function () {
    cordova.exec(null, null, "Timer", "stop", []);
  };
}

module.exports = new Timer();

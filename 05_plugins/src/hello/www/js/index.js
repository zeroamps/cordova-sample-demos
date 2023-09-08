document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.getElementById("deviceready").classList.add("ready");
}

function onClickHandler() {
  cordova.plugins.echo.now(
    (value) => (document.getElementById("now").textContent = value)
  );
}

function onStartHandler() {
  cordova.plugins.ping.start("https://jsonplaceholder.typicode.com/posts");
}

function onStopHandler() {
  cordova.plugins.ping.stop();
}

function onDeviceReady() {
  global.cordova = window.cordova;
}
document.addEventListener('deviceready', onDeviceReady, false);
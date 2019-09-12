//app.js
const mainApp = require('./main-app');

App({
  onLaunch: function (opt) {
    mainApp.onLaunch.apply(this, arguments);
  },
  onShow: function () {
    mainApp.onShow.apply(this, arguments);
  },
  onHide: function () {
    mainApp.onHide.apply(this, arguments);
  },
  globalData: mainApp.globalData
});

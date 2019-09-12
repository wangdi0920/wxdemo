module.exports = {
  onLaunch: function (options) {
    // Do something initial when launch.
    console.log('onLaunch_onLaunch', options);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://www.easy-mock.com/mock/5c7cf7b1b7a08d1246bef89a/wxDemo/login',
          method: 'post',
          success: res => {
            console.log('fetch sessionId: ', res);
            const sessionId = res.data.data.session_id,
              openid = res.data.data.openid,
              uid = res.data.data.uid;
            // 存到storage，并设置存储时的时间戳
            wx.setStorageSync('sessionId', sessionId);
            wx.setStorageSync('sessionIdTime', +new Date());
            wx.setStorageSync('openid', openid);
            wx.setStorageSync('unionid', uid);
            console.log('set sid: ', sessionId);
          },
          fail: res => {
            console.error('Request Fail to fetch SessionId', res);
            // reject(res);
            wx.showModal({
              title: '提示',
              content: '系统维护中，请稍后再试',
              showCancel: false
            });
          }
        })
      }
    })
    // 10分钟后登录前清空当前 sessionId，确保从网关取的用户态是最新的。
    // const now = Number(new Date());
    // const sidTime = wx.getStorageSync('sessionIdTime') || 0;
    // const sessionId = wx.getStorageSync('sessionId');
    // if (sessionId && now - sidTime < 10 * 60 * 1000) {
    //   this.__isLogin__ = true;
    // } else {
    //   this.__isLogin__ = false;
    //   this.__isAuth__ = false;
    //   wx.removeStorageSync('sessionId');
    // }
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg);
  },
  globalData: {
    isLogin: false,
    userInfo: null
  }
};
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎👏来到王迪的微信小程序',
    userInfo: {},
    hasUserInfo: false,
    isShowIndex: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goIndex() {
    if (this.data.userInfo) {
      this.setData({
        isShowIndex: true
      })
    } else {
      wx.showModal({
        title: '暂未授权',
        content: '需要您的授权才能使用哦',
        success:(res)=> {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.openSetting({
              success:(res)=> {
                this.setData({
                  hasUserInfo: true,
                  isShowIndex:true,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  },
  getLocation(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },
})
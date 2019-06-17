//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎👏来到微信小程序练习 王迪',
    userInfo: {},
    hasUserInfo: false,
    isShowIndex: true,
    navigationTop:20,
    navigationHeight:44,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getLocation();
    this.getNavigationTop();
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
        console.log(res)
      }
    })
  },
  // 分享
  onShareAppMessage(res) {
    if (res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '小程序学习',
      path: '/pages/index/index',
      imageUrl: 'https://static.gjzwfw.gov.cn/share.jpg'
    }
  },
  // 获取自定义导航条高度//https://developers.weixin.qq.com/miniprogram/dev/api/wx.getSystemInfoSync.html?search-key=getSystemInfoSync
  getNavigationTop() {
    let systemInfo = wx.getSystemInfoSync();
    const { statusBarHeight } = systemInfo;

    let isAndroid = false;
    if (systemInfo.platform.toLowerCase() === 'android') {
      isAndroid = true;
    }
    let pt = 20;// 导航状态栏上内边距
    let h = 44;// 导航状态栏高度
    if (!isAndroid) {
      pt = statusBarHeight;
      h = 44;
    } else {
      pt = statusBarHeight;
      h = 48;
    }
    this.setData({
      navigationTop: pt,
      navigationHeight: h
    })

  }
})
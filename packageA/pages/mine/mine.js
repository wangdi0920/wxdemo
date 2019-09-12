// pages/mine/mine.js
const app = getApp();
const { numberReplace } = require('../../../utils/util.js')
// let params = {
//   encryptedData: "D4yUWiasFXWLU6YMPADg799K5Y7aeeMZp7hXSi7ZjUTUJdUHfnQIB6HlccqMbHBOtVSpGVpLUBKnfJzmaM2PfSWZCH57BEYehEsHG9CV+LJaH9SHuLlshw64E/iDLoUK6jlVjIFNkf3CaxdnVHp3uVSNulF2Oc0Fz4FPmCNhf+qaZhq8+Q8PotI+plkEAs7uELUMI/wdZJMLs0W/rzCXN1uBsJLaxcz9WEkqagiiSPOjMnSW4t+leEoI2RaMvHKkeihJ/Ud0M46T5d8EWC9Pmy1e9IN82cXHcnk1Ij/kXTVfkF7ND76HtmI3uRvzcyscxdAtIHtyHbeZXubmd9SBogsU0ZKAFItkn6tFShWHdRyRnX2bxmZHvUcfYIkmxmmUBCKbjDpVVW1dZ0ufgeH0U+Yfc2xxHeIjNtd77/ins6AYSPxVR3elb2KHlwRzCdnPV09oXro5KLJYzB0L795hVKe0IXE/8M6y0aVRgW8Bn+M=",
//   ivStr: "y0yR1bhykHje9r58rbte7Q==",
//   token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbiIsInNlc3Npb25LZXkiOiJ4NUhkVEtqMDZjQk1QV2lWZUM1TnR3PT0iLCJvcGVuSWQiOiJvRU1ZNjVIX0hDWUs0RlBOa1BSUmFzVHhRZzZnIiwiZXhwIjoxNTYyNjQxNjc4LCJpYXQiOjE1NjI2MzgwNzgsImp0aSI6ImNkNjE5MzMxLWZlOWYtNGM2Yi04YWUyLTI1N2RjNjJmMjE1ZSJ9.vl5cNAfq8bH4QYS2QipubNmhBrnPTcSmzrFtf59TsZ4"
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: '',
    isShow: false,
    number: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUserInfo(e) {
    console.log(e, getApp().globalData)
    wx.setStorageSync('userInfo', e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.isLogin = true;
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true
    })
  },
  getOpenid () {
    wx.login({
      success (res) {    //请求自己后台获取用户openid
        wx.request({
          url: 'https://30paotui.com/user/wechat',
          data: {
            appid: '你的小程序appid',
            secret: '你的小程序secret',
            code: res.code
          },
          success (response) {
            const openid = response.data.openid; console.log('请求获取openid:' + openid);      //可以把openid存到本地，方便以后调用
            wx.setStorageSync('openid', openid);
            this.setData({
              openid: "获取到的openid：" + openid
            })
          }
        })
      }
    })
  },
  onLoad() {
    console.log(numberReplace('29'))
    this.setData({
      number: numberReplace('29')
    })
  },
  // getOpenid(){
  //   console.log('1')
  //    wx.login({
  //      succes:res=>{
  //        console.log('2')
  //        console.log(res)
  //        //  调用本地服务获取userId 及 本地库用户信息
  //        wx.request({
  //          url: 'https://iygltest.cvqzgcs.com/v2/travel/users/getUserInfo',
  //          data: params,
  //          method: 'POST',
  //          header: {
  //            "Content-Type": "application/json",
  //            'token': res.respData
  //          },
  //          success: function (msg) {
  //            console.log(msg.data.respData)
  //            wx.setStorageSync('userMsgKK', msg.data.respData);
  //            resolve(msg);
  //          }
  //        })
  //      }
  //    })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(getApp().globalData)
    if (
      wx.getStorageSync &&
      wx.getStorageSync('userInfo') &&
      getApp().globalData.isLogin
    ) {
      const userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo);
      this.setData({
        isLogin: true,
        userInfo
      });
    }
  },
  open() {
    this.setData({
      isShow: true
    })
  },
  close() {
    this.setData({
      isShow: false
    })
  },
  // 这个方法必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡
  inbtn(e) {
    console.log(e)
  }
})
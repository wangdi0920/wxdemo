// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isLogin:false,
     userInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
  getUserInfo: function (e) {
    console.log(e, getApp().globalData)
    wx.setStorageSync('userInfo', e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.isLogin = true;
    this.setData({
      userInfo: e.detail.userInfo,
      isLogin: true
    })
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
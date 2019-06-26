// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isLogin:false,
     userInfo:'',
     isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUserInfo (e) {
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
  // onReady: function () {

  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
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
  open(){
    this.setData({
      isShow: true
    })
  },
  close(){
    this.setData({
      isShow: false
    })
  },
  // 这个方法必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡
  inbtn(e){
    console.log(e)
  },  
  /**
   * 生命周期函数--监听页面隐藏
   */
  // onHide: function () {

  // },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function () {

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})
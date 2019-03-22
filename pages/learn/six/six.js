// pages/learn/six/six.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { title: 'i游桂林', addId: 'wx4ef821502842272e' },
      { title: '中国政务服务平台', addId: 'wx2eec5fb00157a603' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goOther(e){
    let appId = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateToMiniProgram({
      appId,
      path: 'pages/index/index',
      extraData: { //需要传递给目标小程序的数据，目标小程序可在 
        foo: 'bar'
      },
      envVersion: 'release', //开发版 develop 体验版 trial 正式版 release
      success(res) {
        // 打开成功
      }
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
// pages/learn/catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:[
      { path: '/pages/learn/once/once', name:'第一节：简述小程序的目录结构'},
      { path: '/pages/learn/two/two', name:'第二节：简述小程序的路由' },
      { path: '/pages/learn/three/three', name:'第三节：简述小程序的分享功能和自定义组件计数器' },
      { path: '/pages/learn/four/four', name: '第四节：小程序授权和获取地理位置' },
      { path: '/pages/learn/five/five', name: '第五节：小程序路由拦截器' },
      { path: '/pages/learn/six/six', name: '第六节：跳转其他小程序和弹性布局' },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleTap(e){
    console.log(e)
    let url = e.target.dataset.url;
    wx.navigateTo({
      url: url,
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
// pages/outUrl/outUrl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    index:'',
    urlitem:'',
    urlCon: [
      {
        title: '跳转链接参考文档',
        urlList: [
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html?search-key=web-view' }
        ]
      },
      {
        title: '组件参考文档',
        urlList: [
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html' }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id, options.index)
      this.setData({
        id:options.id,
        index:options.index,
        urlitem: this.data.urlCon[options.id].urlList[options.index].url
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
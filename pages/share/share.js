// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    index:'',
    urlCon:[
      { title: '跳转链接参考文档', 
      urlList: [
        { url: 'https://zhihui.tshuiwan.com/daolan'}
      ]},
      {
        title: '组件参考文档', 
        urlList: [
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html' },
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html' }
        ] },
      {
        title:'swiper参考文档',
        urlList:[
          {            url:'https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html'
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  openUrl(e){
    console.log(e)
    let url = e.target.dataset.url;
    wx.setStorageSync('webView',url )
    wx.navigateTo({
      url: '/pages/outUrl/outUrl'
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
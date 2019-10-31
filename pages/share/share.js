// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    index: '',
    urlCon: [
      {
        title: '跳转链接参考文档',
        urlList: [
          { url: 'https://zhihui.tshuiwan.com/daolan' }
        ]
      },
      {
        title: '组件参考文档',
        urlList: [
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html' },
          { url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html' }
        ]
      },
      {
        title: 'swiper参考文档',
        urlList: [
          {
            url: 'https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html'
          }
        ]
      }
    ]
  },

  openUrl(e) {
    console.log(e)
    const { url } = e.target.dataset
    wx.setStorageSync('webView', url)
    wx.navigateTo({
      url: '/packageA/pages/outUrl/outUrl'
    })
  },

})
// pages/learn/two/two.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goOne(){
    wx.navigateTo({
      url: '/packageA/pages/logs/logs',
    })
  },
  goTwo(){
    wx.redirectTo({
      url: '/packageA/pages/logs/logs',
    })
  },
  goThree(){
    wx.navigateBack({
    })
  },
  goFour(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  
})
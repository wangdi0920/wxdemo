// pages/learn/four/four.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: '../../../image/icon2/fenxiang.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
    hot_tab_nav: [
      {
        title: '运动',
        active_class: ''
      },
      {
        title: '电影',
        active_class: ''
      },
      {
        title: '音乐',
        active_class: 'active'
      }
    ],
    lastIndex: 2,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  chooseAddress(){
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
      },
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
      },
    })
  },
  
  
  
})
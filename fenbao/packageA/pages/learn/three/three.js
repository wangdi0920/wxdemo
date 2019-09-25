// pages/learn/three/three.js
const report = require('../../../../../utils/report.js') ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valueNumber: 0,
    valueNumber2: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    report.countShare('转发成功');
  },
  //转发
  onShareAppMessage(res) {
   
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      path: '/page/learn/three/three'
    }
  },
  onChange(ev) {
    console.log(ev.detail)
    this.setData({
      valueNumber: ev.detail
    })
  },
  onChange2(ev) {
    this.setData({
      valueNumber2: ev.detail
    })
  }
 
})
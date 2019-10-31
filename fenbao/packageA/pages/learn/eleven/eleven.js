// fenbao/packageA/pages/learn/eleven/eleven.js
Page({
  data:{
    dateRange:''
  },
  onLoad(){
    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth() +1
    let d = now.getDate()
    let startDate =  new Date().toISOString().slice(0, 10)
    let endDate = new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10)
    this.setData({
      dateRange: startDate + '至' + endDate
    })
  
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  
})
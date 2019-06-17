// pages/learn/seven/seven.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxArr: [
      { name: '摄影', value: '0' },
      { name: '唱歌', value: '1' },
      { name: '笑话', value: '2' },
      { name: '方言', value: '3' },
      { name: '电影', value: '4', checked: 'true' },
    ],
    radioboxArr: [{
      name: '男',
      checked: false
    }, {
      name: '女',
      checked: false
    }
    ]
  },
  getValue(e){
    console.log(e.detail)
  },
  // 双选
  // checkbox: function (e) {
  //   console.log(e)
  //   var index = e.currentTarget.dataset.index;//获取当前点击的下标
  //   var checkboxArr = this.data.checkboxArr;//选项集合
  //   checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
  //   this.setData({
  //     checkboxArr: checkboxArr
  //   });
  // },
  // checkboxChange: function (e) {
  //   console.log(e)
  //   var checkValue = e.detail.value;
  //   this.setData({
  //     checkValue: checkValue
  //   });
  //   console.log(this.data.checkValue)
  // },

//单选
  radio: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var radioboxArr = this.data.radioboxArr;//选项集合
    if (radioboxArr[index].checked) return;//如果点击的当前已选中则返回
    radioboxArr.forEach(item => {
      item.checked = false
    })
    radioboxArr[index].checked = true;//改变当前选中的checked值
    this.setData({
      radioboxArr: radioboxArr
    });
  },
  radioChange: function (e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
    console.log(this.data.checkValue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  orderBuy(){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { },
      fail(res) { }
    })
  }

})
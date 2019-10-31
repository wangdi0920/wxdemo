// fenbao/packageA/pages/learn/ten/ten.js
Page({
  data: {
    params: { //选择日期需要的参数
      isTrue: "1",
      sempleDate: "",
      shopType: "0",
      showInDate: "-",
      isDetail: true,
      priceenddate: '',
    },
    selsectDate: [
      { name: '哈哈', ids: '0', checked:true },
      { name: '啦啦啦', ids: '1', checked: true },
      { name: '哇哇哇', ids: '2', checked: false }
    ],
    checked: ['1','2'],
    //表单提交信息
    formData:{
      name:'',
      backup: ''
    }
  },
  onLoad(){
    const filter = this.data.selsectDate.filter(item=>{
      return item.ids ===  '2'
    })
    const filterDate = this.data.selsectDate.reduce((array,{checked,...e})=>{
      return checked ? [...array,e] : array
    },[])
    console.log(filterDate)
  },
  onShow(){
    
    console.log(this.data.showInDate)
  },
  selectDate(){
    const { isTrue, sempleDate, showInDate} =  this.data
    console.log(showInDate)
    wx.navigateTo({
      url: '../../select-calendar/select-calendar' + '?isTrue=1&sempleDate=' + '' + '&showInDate=' + showInDate + '&sempleDate=' + '2019-10-13',
    })
  },
  onSubmit(ev){
    console.log(ev.detail.value)
  },
  onReset(ev){
    this.setData({
      formData: {
        name: '',
        backup: ''
      }
    })
    
  }

})
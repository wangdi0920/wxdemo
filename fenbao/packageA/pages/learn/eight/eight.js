// fenbao/packageA/pages/learn/eight/eight.js
const formatChinaDate = mss => {
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((mss % (1000 * 60)) / 1000);
  return days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 ';
};
/** 计时器集合，用于销毁 */
let timers = []
Page({
  data: { 
    theme:'', 
    region: ['广东省', '广州市', '海珠区'],
    formatTime: formatChinaDate,
    creatTargetTime: 1569913200000, //时间戳
    creatTargetTime2: 1569913200000
    
  },
  /*地区选择*/
  bindRegionChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region:  e.detail.value
    }, () => {
      console.log(this.data.region)
    })
  },
  getPageList: ()=> {
    //倒计时结束啦
    console.log('倒计时结束啦')
  },
  onShow() {
    this.setTheme()

  },
  onHide() {
    this.destroyTimers()
  },
   /** 定时更改、恢复主题 */
  setTheme() {
    const now = new Date()
    const start = new Date(2019, 9, 1)
    const end = new Date(2019, 9, 8)

    console.log(now, 'now')
    console.log(start, 'change theme')
    console.log(end, 'restore theme')

    const deltaStart = start - now //不在国庆期间 从现在到国庆还有多久
    const deltaEnd = end - now //在国庆期间 从现在到国庆结束还要多久

    console.log('change theme remain', deltaStart / 1000, 's')
    console.log('restore theme remain', deltaEnd / 1000, 's')

    if (deltaStart > 0) {
      console.log('11111')
      this.data.theme && this.restoreTheme()
      timers.push(setTimeout(this.changeTheme, deltaStart)) //在多少时间之后开始执行定时器
      timers.push(setTimeout(this.restoreTheme, deltaEnd))
    } else if (deltaEnd > 0) {
      console.log('2222')
      // 国庆中
      this.data.theme || this.changeTheme()
      timers.push(setTimeout(this.restoreTheme, deltaEnd))
    } else {
      console.log('3333')
      // 国庆后
      this.data.theme && this.restoreTheme()
    }

    console.log('timers', timers)
  },

  /** 销毁计时器 */
  destroyTimers() {
    timers.forEach(clearTimeout)
    console.log('timers cleared', timers)
    timers = []
  },
  /** 更换主题 */
  changeTheme() {
    this.setData({ theme: '国庆主题' })
    console.log('+++++更换主题')
  },

  /** 恢复主题 */
  restoreTheme() {
    this.setData({ theme: '' })
    console.log('+++++恢复主题')
  },
})

// fenbao/packageA/pages/learn/nine/nine.js
const Moment = require('../../../../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    dataImage: [],
    day:''
  },
  onLoad(){
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), 1)
    const momentDate = Moment(now).add(2, 'month')
    // const year = momentDate.getFullYear();
    // const month = momentDate.getMonth() + 1;
    this.setData({
      day: Moment().format("YYYY年MM日DD")
      // day: moment(now).add(1, 'month').date.getFullYear()
    })
    console.log(momentDate)
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  upLoadImg(){
    console.log('上传图片')
    wx.chooseImage({
      count: 2,  //最多可以选择的图片张数
      sizeType: ['original', 'compressed'], //所选的图片的尺寸 原图和压缩图
      sourceType: ['album', 'camera'],  //选择图片的来源 从相册选或者使用相机
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          dataImage: tempFilePaths
        })
        const { tempFiles } = res
        const { length } = tempFiles 
        console.log(res.tempFiles)
        for (let i = 0; i < length; i++) {
          const { path, size } = tempFiles[i]
          console.log(size)
        }
      }
    })
  }
})
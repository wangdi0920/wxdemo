// components/upload-img/upload-img.js
/** “上传中”状态，用于防止上传按钮被多次触发 */
let flagUploading = false
const {
  chooseImage
} = require('../../utils/wrapped-wx-api.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxLen: {
      type: Number,
      value: 5
    },
    uploadImg: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    /** 上传图片临时地址 */
    uploadImg: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 上传图片 */
    addUploadImg() {
      // 若存在“上传中”状态，则取消
      if (flagUploading) return

      // 设置“上传中”状态
      flagUploading = true
      let { uploadImg } = this.data

      chooseImage({
        count: this.data.maxLen - uploadImg.length,
        success: dataList => {
          this.setData({ uploadImg: [...uploadImg, ...dataList] })
          uploadImg = [...uploadImg, ...dataList]
          this.triggerEvent('load-img', uploadImg);
        },
        complete: () => {
          // 解除“上传中”状态
          flagUploading = false
        },
      })
    },

    /** 删除上传图片 */
    delUploadImg(ev) {
      const { idx } = ev.currentTarget.dataset
      const { uploadImg } = this.data
      uploadImg.splice(idx, 1)
      this.setData({ uploadImg })
      this.triggerEvent('load-img', uploadImg);
    }
  }
})

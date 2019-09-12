// components/g-ui/g-num/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    add() { 
      this.setData({
        num: this.data.num + 1
      })
      console.log(this.data.num)
      this.triggerEvent('numChange', this.data.num);
    },
    sub() {
      if(this.data.num >= 0) {
        this.setData({
          num: this.data.num - 1
        })
      }
      this.triggerEvent('numChange', this.data.num);
      //将组件数据传到外部的方法为this.triggerEvent('方法名',{要传递的数据})。
      // @自定义事件名aaa  =  " 父组件对应的函数fn "
      // 和vue中的this.$emit('@自定义事件名aaa '，（要传递给父组件的参数）)
    }
  }
})

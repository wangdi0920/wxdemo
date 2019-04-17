// components/more/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      observer(value) {
        this.setData({ _text: value.slice(0, this.properties.max) });
      }
    },
    max: {
      type: Number,
      value: 55
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _text: '',
    isHide: true,
    btn_text: ''
  },

  /**
   * 组件的方法列表
   */
  ready() {
    if (this.properties.text.length > this.properties.max) {
      this.setData({ isHide: false, btn_text: '全文' });
    }
  },
  methods: {
    // this.properties.text.slice(this.properties.max)
    quanW() {
      if (this.data.isHide) {
        this.setData({ _text: this.properties.text.slice(0, this.properties.max), isHide: false, btn_text: '全文' });
      } else {
        this.setData({ _text: this.properties.text, isHide: true, btn_text: '收起' });
      }
    }
  }
});

// components/g-ui/g-checkbox/index.js
Component({
  properties: {
    checkList: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    checkbox: function (e) {
      console.log(e)
      var index = e.currentTarget.dataset.index;//获取当前点击的下标
      var checkList = this.data.checkList;//选项集合
      checkList[index].checked = !checkList[index].checked;//改变当前选中的checked值
      this.setData({
        checkList: checkList
      });
    },
    checkboxChange: function (e) {
      console.log(e)
      var checkValue = e.detail.value;
      this.setData({
        checkValue: checkValue
      });
      console.log(this.data.checkValue)
      this.triggerEvent('getValue', checkValue);
    },
  }


})
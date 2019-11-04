// components/count-down/count-down.js
let timer = 0;
const interval = 1000;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    target: {
      type: String,
    },
    format: {
      type: Function,
      default: null
    }
  },

  lifetimes: {
    attached() {
      //组件创建时
      this.setData({
        lastTime: this.initTime(this.properties).lastTime,  //根据 target 初始化组件的lastTime属性
      })
      //开启定时器
      this.tick();
    },

    detached() {
      //组件销毁时清除定时器 防止爆栈
      // eslint-disable-next-line no-undef
      clearTimeout(timer);
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    d: 0, //天
    h: 0, //时
    m: 0, //分
    s: 0, //秒
    result: '',  //自定义格式返回页面显示结果
    lastTime: ''  //倒计时的时间戳
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //默认处理时间格式
    defaultFormat(time) {
      const day = 24 * 60 * 60 * 1000
      const hours = 60 * 60 * 1000;
      const minutes = 60 * 1000;

      const d = Math.floor(time / day);
      const h = Math.floor((time - d * day) / hours);
      const m = Math.floor((time - d * day - h * hours) / minutes);
      const s = Math.floor((time - d * day - h * hours - m * minutes) / 1000);
      this.setData({
        d,
        h,
        m,
        s
      })
    },

    //定时事件
    tick() {
      let {
        lastTime
      } = this.data;
      // eslint-disable-next-line no-undef
      timer = setTimeout(() => {
        if (lastTime < interval) {
          // eslint-disable-next-line no-undef
          clearTimeout(timer);
          this.setData({
            lastTime: 0,
            result: ''
          });
          this.defaultFormat(lastTime)
          this.onEnd();
        } else {
          lastTime -= interval;
          this.setData({
            lastTime,
            result: this.properties.format ? this.properties.format(lastTime) : ''
          });
          this.defaultFormat(lastTime)
          this.tick();
        }
      }, interval);
    },

    //初始化时间
    initTime(properties) {
      let lastTime = 0;
      let targetTime = 0;
      targetTime = new Date(properties.target).getTime();
      lastTime = targetTime - new Date().getTime();
      return {
        lastTime: lastTime < 0 ? 0 : lastTime,
      };
    },
    //时间结束回调事件
    onEnd() {
      this.triggerEvent('onEnd');
    }
  }
})


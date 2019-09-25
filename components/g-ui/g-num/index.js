// components/stepper/stepper.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    /** 输入值 */
    value: null,
    /** 是否禁用 */
    disabled: Boolean,
    /** 输入框宽度，须指定单位 */
    inputWidth: String,
    /** 是否禁用输入框 */
    disableInput: Boolean,
    /** 最小值 */
    min: {
      type: null,
      value: 0
    },
    /** 最大值 */
    max: {
      type: null,
      value: Number.MAX_SAFE_INTEGER //es6新增 表示最大整数
    },
    /** 步数 */
    step: {
      type: null,
      value: 1
    },
  },
  methods: {
    range(value) {
      value = String(value).replace(/[^0-9.-]/g, '');
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },
    onChange(type) {
      const diff = type === 'minus' ? -this.data.step : +this.data.step;
      const value = Math.round((+this.data.value + diff) * 100) / 100;
      this.triggerEvent('change', this.range(value))
    },
    onInput(ev) {
      const { value = '' } = ev.detail || {};
      this.triggerEvent('change', this.range(value))
    },
    /** 减少 */
    onMinus() {
      this.onChange('minus');
    },
    /** 增加 */
    onPlus() {
      this.onChange('plus');
    },
  }
})
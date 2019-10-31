// components/component-calendar/component-calendar.js
const Moment = require("./moment.js");
const { sFtv } = require("./data.js");
const DATE_YEAR = new Date().getFullYear();
const DATE_MONTH = new Date().getMonth() + 1;
const DATE_DAY = new Date().getDate();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**最多显示月份 */
    maxMonth: {
      type: Number,
      value: 12,
    },
    /*今日，明日是否可选*/
    // todayOrTroIsShow: {
    //   type: Boolean,
    //   value: true
    // },
    /**是否显示价钱 */
    // isHaveMoney: {
    //   type: Boolean,
    //   value: true
    // },
    /**是否选择连续天数 */
    isContinueDays: {
      type: Boolean,
      value: true
    },
    /**是否是单选 */
    isSempleSelect: {
      type: Boolean,
      value: true
    },
    /**单选选中的日期 */
    sempleDate: {
      type: Object,
      value: {
        id: '',
        date: ''
      }
    },
    /**多选选中日期 */
    moreDates: {
      type: Object,
      value: {
        startDate: {
          id: '',
          date: ''
        },
        endDate: {
          id: '',
          date: ''
        }
      }
    },
    /**有效日期 */
    priceenddate: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _END_DATE_YEAR: '', //结束年
    _END_DATE_MONTH: '', //结束月
    _END_DATE_DAY: '', //结束天
    /**星期标题 */
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    /**日历列表 */
    dateList: [],
    /**价钱数据 */
    moneyList: [],
    /**特殊节日 */
    sFtv: sFtv,
    /**点击次数 */
    tipTimes: true,
    /**价钱求和 */
    allPrice: 0,
    /**是否可以返回 */
    isBack: true
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready() {
      this.createDateListData()
    },
  },
  pageLifetimes: {
    show() {
      // 页面被展示
      console.log(this.data.moneyList)
      this.createDateListData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**创建日历列表数据 */
    createDateListData() {
      const dateList = [];
      let now = new Date();
      /*
        设置日期为 年-月-01,否则可能会出现跨月的问题
        比如：2017-01-31为now ,月份直接+1（now.setMonth(now.getMonth()+1)），则会直接跳到跳到2017-03-03月份.
          原因是由于2月份没有31号，顺推下去变成了了03-03
      */
      now = new Date(now.getFullYear(), now.getMonth(), 1);
      //设置价格结束日期
      if (this.data.priceenddate) {
        const newVal = this.data.priceenddate.split('-')
        this.setData({
          _END_DATE_YEAR: newVal[0],
          _END_DATE_MONTH: newVal[1],
          _END_DATE_DAY: newVal[2],
        });
      }

      for (let i = 0; i < this.data.maxMonth; i++) {
        const momentDate = Moment(now).add(this.data.maxMonth - (this.data.maxMonth - i), 'month').date;
        const year = momentDate.getFullYear();
        const month = momentDate.getMonth() + 1;

        const days = [];
        const totalDay = this.getTotalDayByMonth(year, month);
        const week = this.getWeek(year, month, 1);
        //-week是为了使当月第一天的日期可以正确的显示到对应的周几位置上，比如星期三(week = 2)，则当月的1号是从列的第三个位置开始渲染的，前面会占用-2，-1，0的位置,从1开正常渲染
        for (let j = -week + 1; j <= totalDay; j++) {
          let tempWeek = -1;
          if (j > 0)
            tempWeek = this.getWeek(year, month, j);
          let clazz = '';
          if (tempWeek === 0 || tempWeek === 6)
            clazz = 'week'
          // if (j < DATE_DAY && year === DATE_YEAR && month === DATE_MONTH || month > this.data._END_DATE_MONTH || year > this.data._END_DATE_YEAR || (j > this.data._END_DATE_DAY && year === this.data._END_DATE_YEAR && month === this.data._END_DATE_MONTH))
          if (j < (this.data.todayOrTroIsShow ? DATE_DAY + 2 : DATE_DAY) && year == DATE_YEAR && month == DATE_MONTH)
            //当天之前的日期不可用
            clazz = 'unavailable ' + clazz;
          else
            clazz = '' + clazz
          days.push({
            day: j,
            className: clazz
          })
        }
        const dateItem = {
          id: year + '-' + month,
          year,
          month,
          days
        }
        dateList.push(dateItem);
      }

      this.setCalanderStyle(dateList)

      this.setData({
        dateList
      })
      console.log(this.data.dateList);
    },
    /*
     * 获取月的总天数
     */
    getTotalDayByMonth(year, month) {
      const newMonth = parseInt(month, 10);
      const d = new Date(year, newMonth, 0);
      return d.getDate();
    },
    /*
     * 获取月的第一天是星期几
     */
    getWeek(year, month, day) {
      const d = new Date(year, month - 1, day);
      return d.getDay();
    },
    /** 点击日期事件 */
    onPressDate(e) {
      console.log(e.currentTarget.dataset);
      const {
        // price,
        // stockNum,
        come,
        className,
        //  out
      } = e.currentTarget.dataset.info;
      // const {
      //   classname
      // } = e.currentTarget.dataset;
      const sempleDate = {
        id: e.currentTarget.dataset.year + '-' + e.currentTarget.dataset.month,
        date: e.currentTarget.dataset.day
      }
      if (this.data.isContinueDays) { //单选
        // stockNum > 0
        if (!className.includes('unavailable')) {
          // console.log(e.currentTarget.dataset.info)
          this.renderPressStyle(this.data.dateList, sempleDate)
        } else {
          wx.showToast({
            title: '当前日期不可预订，请选择其他日期',
            icon: 'none'
          })
        }
      } else {
        const {
          dateList
        } = this.data;
        console.log('点击次数', this.data.tipTimes);
        if (this.data.tipTimes) {
          if (!className.includes('unavailable')) {
            this.data.moreDates.startDate = sempleDate;
            this.renderPressStyle(dateList, sempleDate)
            this.data.tipTimes = false;
          } else {
            this.data.tipTimes = true;
            wx.showToast({
              title: '当前日期不可预订，请选择其他日期',
              icon: 'none'
            })
          }
        } else if (come) {
          this.data.tipTimes = false;
        } else {
          console.log('第二次')
          const { startDate } = this.data.moreDates
          const startYear = +startDate.id.split('-')[0];
          const endYear = +sempleDate.id.split('-')[0];
          const startMonth = +startDate.id.split('-')[1]
          const endMonth = +sempleDate.id.split('-')[1];
          const startDay = startDate.date
          const endDay = sempleDate.date
          if (startYear > endYear || (startYear === endYear && startMonth > endMonth) || (startYear === endYear && startMonth === endMonth && startDay > endDay)) {
            if (!className.includes('unavailable')) {
              this.data.tipTimes = false;
              this.data.moreDates.startDate = sempleDate;
              this.renderPressStyle(dateList, sempleDate)
            } else {
              this.data.tipTimes = true;

              wx.showToast({
                title: '包含不可预订日期，请重新其他日期',
                icon: 'none'
              })
            }

          } else {

            const moreDates = {}
            this.data.tipTimes = true;
            this.data.isBack = true;
            moreDates.startDate = startDate
            moreDates.endDate = sempleDate
            this.selectMoreDate(dateList, moreDates)
            console.log(this.data.allPrice, this.data.isBack, this.data.moreDates);
            this.triggerEvent('getMoreDates', {
              allPrice: this.data.allPrice,
              isBack: this.data.isBack,
              moreDates: this.data.moreDates
            });
          }

        }

      }
    },

    /** 单选内容处理 */
    renderPressStyle(dateList, sempleDate) {
      console.log(dateList, sempleDate)
      dateList.forEach((item) => {
        item.days.forEach(days => {
          if (item.id === sempleDate.id) { //同一个月
            if (days.day === sempleDate.date) { //同一天
              days.className = days.className + ' ' + 'active'
              if (!this.data.isContinueDays) {
                if (!days.className.includes('unavailable')) {
                  days.come = true;
                  days.out = false;
                  days.className = days.className + ' ' + 'active'
                  this.data.allPrice = days.price;
                } else {
                  wx.showToast({
                    title: '当前日期不可预订，请选择其他日期',
                    icon: 'none'
                  })
                  this.deleteStyle(days)
                }
              } else {
                days.className = days.className + ' ' + 'active'
                this.data.allPrice = days.price;
              }

            } else {
              this.deleteStyle(days);
            }
          } else {
            this.deleteStyle(days);
          }
        })
      })
      this.setData({
        dateList,
        sempleDate
      });
      this.triggerEvent('getDetails', {
        allPrice: this.data.allPrice,
        isBack: this.data.isBack,
        sempleDate: this.data.sempleDate
      });
      // console.log(this.data.allPrice);
    },
    /**多选处理 */
    selectMoreDate(dateList, moreDates) {
      dateList.forEach((item, i) => {
        /**同一个月的情况 */
        // eslint-disable-next-line complexity
        item.days.forEach(days => {
          if (item.id === moreDates.startDate.id && moreDates.startDate.id === moreDates.endDate.id) {
            if (moreDates.startDate.date >= moreDates.endDate.date) {
              // this.comeThanLeave();
            } else
              if (days.day === moreDates.startDate.date) {
                days.className = days.className + ' active';
                days.come = true;
              } else if (days.day === moreDates.endDate.date) {
                days.className = days.className + ' active'
                days.out = true;
              } else if (days.day > moreDates.startDate.date && days.day < moreDates.endDate.date) {
                this.setBgitemClass(days)
              }
          } else if (moreDates.startDate.id !== moreDates.endDate.id) { // 不同月份
            const startYear = +moreDates.startDate.id.split('-')[0];
            const endYear = +moreDates.endDate.id.split('-')[0];
            const startMonth = +moreDates.startDate.id.split('-')[1];
            const endMonth = +moreDates.endDate.id.split('-')[1];
            if ((startYear === endYear && startMonth > endMonth) || endYear < startYear) {
              // 同一年并且开始月份大于结束月份   或者 开始年份大于结束年份  不合法
            } else

              if (item.id === moreDates.startDate.id && days.day === moreDates.startDate.date) { // 入店时间
                if (!days.className.includes('active')) {
                  this.data.allPrice += days.price;
                  days.className = days.className + ' ' + 'active';
                  days.come = true;
                }

              } else if (item.id === moreDates.endDate.id && days.day === moreDates.endDate.date) { // 出店时间

                days.className = days.className + ' ' + 'active'
                days.out = true;
              } else if (item.id === moreDates.startDate.id && days.day > moreDates.startDate.date) { // 开始时间余下天数

                this.setBgitemClass(days)
              } else if (item.id === moreDates.endDate.id && days.day < moreDates.endDate.date && days.day > 0 && moreDates.endDate.date !== 1) { // 结束时间余下天数
                this.setBgitemClass(days)

              } else if (item.year === startYear && (startYear === endYear) && (item.month > startMonth && item.month < endMonth)) { // 同一年


                this.setBgitemClass(days)
              } else if (startYear < endYear) { // 不同年
                if (item.year === startYear && (item.month > startMonth && item.month <= 12)) {

                  this.setBgitemClass(days)
                } else if (item.year === endYear && item.month >= 1 && item.month < endMonth) {

                  this.setBgitemClass(days)
                } else if (item.year > startYear && item.year < endYear) {

                  this.setBgitemClass(days)
                }
              }
          } else {
            this.deleteStyle(days);
          }
        })

      })
      this.setData({
        dateList,
        moreDates
      });
    },
    /** 接口请求价格更改格式 */
    reSetPrice(moneyList) {
      const moneyPrice = moneyList.reduce((newMoneyList, val) => {
        if (val.month.includes(0) && val.month !== 10) {
          val.month = val.month.replace(/0/u, '');
        }
        const id = val.year + '-' + val.month;
        const {
          day
        } = val;
        newMoneyList[id] ? (newMoneyList[id][day] = val) : (newMoneyList[id] = {
          [day]: val
        })
        return newMoneyList;
      }, {})
      return moneyPrice
    },
    /**初始化日历样式渲染 */
    setCalanderStyle(datelist) {
      const { sFtv } = this.data
      let { moneyList } = this.data;
      moneyList = this.reSetPrice(moneyList)
      const dateList = datelist.map(itemMonth => {
        if (this.data.isContinueDays && itemMonth.id === this.data.sempleDate.id) {
          itemMonth.days.forEach(itemDay => {
            if (itemDay.day === this.data.sempleDate.date) { // 一天
              itemDay.className = itemDay.className + ' active'
            }
          })
        }
        sFtv.forEach((itemSF) => {
          if (itemMonth.month === itemSF.month) {
            const { days } = itemMonth;
            days.forEach((itemDay) => {
              if (itemDay.day === itemSF.day) {
                itemDay.daytext = itemSF.name
              }
            })
          }
        })

        if (this.data.isHaveMoney) {
          const foundMonth = moneyList[itemMonth.id]
          // console.log('foundMonth', foundMonth)
          if (foundMonth) {
            itemMonth.days.forEach(day => {
              let dayId = '';
              if (day.day >= 0 && day.day < 10) {
                dayId = '0' + day.day;
              } else {
                dayId = day.day;
              }
              const findDays = foundMonth[dayId]
              if (findDays) {
                day.price = findDays.price
                day.childprice = findDays.childprice
                day.stockNum = findDays.stockNum
                if (findDays.price <= 0) {
                  day.className += ' ' + 'unavailable'
                }
                if (!findDays.stockNum || findDays.stockNum <= 0) {
                  day.className += ' ' + 'unavailable'
                }

              } else {
                day.className += ' ' + 'unavailable'
              }
            })
          } else {
            itemMonth.days.forEach(day => {
              day.className += ' ' + 'unavailable'
            })
          }
        }

        return itemMonth
      })



      if (!this.data.isContinueDays) {
        this.selectMoreDate(dateList, this.data.moreDates)
      }
    },
    /**删除改变后的样式 */
    deleteStyle(days) {
      days.className = days.className.replace(/ active/gu, '');
      days.className = days.className.replace(/ bgitem/gu, '');
      days.className = days.className.replace(/ nobgItem/gu, '');
      days.come = false;
      days.out = false;
    },
    /**入住时间大于出店时间 */
    comeThanLeave(dateList, startDate, sempleDate) {
      const startYear = +startDate.id.split('-')[0];
      const endYear = +sempleDate.id.split('-')[0];
      const startMonth = +startDate.id.split('-')[1]
      const endMonth = +sempleDate.id.split('-')[1];
      const startDay = startDate.date
      const endDay = sempleDate.date
      if (startYear > endYear || (startYear === endYear && startMonth > endMonth) || (startYear === endYear && startMonth === endMonth && startDay > endDay)) {
        this.data.tipTimes = false;
        //  startDate = sempleDate;
        this.renderPressStyle(dateList, sempleDate)
      }
    },
    /**放连选状态 */
    setBgitemClass(days) {
      if (days.className.includes('unavailable')) {
        wx.showToast({
          title: '包含不可预订日期，请重新其他日期',
          icon: 'none'
        })
        days.className = days.className + ' ' + 'nobgItem'
        this.data.isBack = false
      } else {
        if (days.day >= 1) {
          this.data.allPrice += days.price;
        }
        days.className = days.className + ' ' + 'bgitem'
      }
    }
  }
})

// fenbao/packageA/pages/select-calendar/select-calendar.js
Page({
  data: {
    moneyList: [],
    priceenddate: '',//价格结束日期
    isTrue: false,//true 为单选 false 为多选
    sempleDate: {//单选选中的日期
      id: '', //2019-10
      date: '' //13
    },
    moreDates: {//多选选中日期
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

  /**
   * 页面初始化
   */
  onLoad(options) {
    console.log(options)
    if (options.isDetail && options.isDetail) {
      this.data.isDetail = true;
    }
    if (options.priceenddate) {
      this.setData({
        priceenddate: options.priceenddate
      })
    }
    if (options.isTrue === '1') {
      this.setData({
        isTrue: true //单选
      })
      if (options.showInDate != "") {
        const echoDisplay = options.sempleDate.split('-');
        const mon = Number(echoDisplay[1]);
        console.log('11',echoDisplay)
        this.setData({
          sempleDate: {
            id: echoDisplay[0] + '-' + mon,
            date: echoDisplay[2]
          }
        })
      }
    } else {
      if (options.checkInDate != "") {
        const inDateArr = options.checkInDate.split('-');
        const outDateArr = options.checkOutDate.split('-');
        this.setData({
          moreDates: {
            startDate: {
              id: inDateArr[0] + '-' + Number(inDateArr[1]),
              date: inDateArr[2]
            },
            endDate: {
              id: outDateArr[0] + '-' + Number(outDateArr[1]),
              date: outDateArr[2]
            }
          }
        })
      }
    }
  },
  getDetails(data) {
    console.log('data', data)
    const { isBack, sempleDate } = data.detail;
    const timeArr = sempleDate.id.split('-');
    const year = timeArr[0]
    const mon = timeArr[1] < 10 ? '0' + timeArr[1] : timeArr[1];
    const day = sempleDate.date < 10 ? '0' + sempleDate.date : sempleDate.date;
    const showInDate = year + '-' + mon + '-' + day;
    const pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];   //当前页面
    const prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      showInDate
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getMoreDates(data) {
    // console.log('data', data)
    const {
      moreDates,
      isBack, // 是否返回正确值
      allPrice
    } = data.detail
    if (isBack) {
      const pages = getCurrentPages();
      //  let currPage = pages[pages.length - 1];   //当前页面
      const prevPage = pages[pages.length - 2];  //上一个页面
      prevPage.setData({
        checkInDate: this.transformationTime(moreDates.startDate.id) + '-' + (moreDates.startDate.date < 10 ? '0' + moreDates.startDate.date : moreDates.startDate.date),
        checkOutDate: this.transformationTime(moreDates.endDate.id) + '-' + (moreDates.endDate.date < 10 ? '0' + moreDates.endDate.date : moreDates.endDate.date),
        money: allPrice
      });
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  transformationTime(time) {
    const timeArr = time.split('-');
    let mon = timeArr[1];
    if (mon < 10) {
      mon = '0' + mon;
    }
    return timeArr[0] + '-' + mon;
  }

})
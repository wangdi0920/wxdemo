// pages/learn/five/five.js
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hot_tab_nav: [
      {
        title: '运动',
        active_class: ''
      },
      {
        title: '电影',
        active_class: ''
      },
      {
        title: '音乐',
        active_class: 'active'
      }
    ],
    lastIndex: 2,
  },
  // 切换跳转
  swichNav(e) {
    console.log(e)
    const dropLastIdx = `hot_tab_nav[` + this.data.lastIndex + `].active_class`
    const currentIdx = 'hot_tab_nav[' + e.target.dataset.current + '].active_class'
    console.log(2 - e.target.dataset.current);
    const currentIndex = 2 - e.target.dataset.current
    this.setData({
      [dropLastIdx]: '',
      [currentIdx]: 'active',
      currentIndex: currentIndex,
      lastIndex: e.target.dataset.current,
    })
  },
  // 横向滑动
  pagechange(e) {
    console.log(e)
    if ("touch" === e.detail.source) {
      const currentPageIndex = e.detail.current;
      const currentIndex = 2 - currentPageIndex;
      const dropLastIdx = `hot_tab_nav[` + this.data.lastIndex + `].active_class`
      const currentIdx = 'hot_tab_nav[' + currentIndex + '].active_class'
      this.setData({
        [dropLastIdx]: '',
        [currentIdx]: 'active',
        currentIndex: currentPageIndex,
        lastIndex: currentIndex
      })
    }
  },
})

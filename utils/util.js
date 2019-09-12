const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const numberReplace = str => {
  const NUMBER = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let strData = str.replace(/\d/gu, ($0) => {
    return NUMBER[$0];
  })
  console.log(strData)
  if (strData.length === 2) {
    if (strData[0] === '一' && strData[1] === '零') {
      strData = '十'
    } else if (strData[0] === '一' && strData[1] !== '零') {
      strData = '十' + strData[1]
    } else {
      strData = strData[0] + '十' + strData[1]
    }
  }
  return strData
};

module.exports = {
  formatTime: formatTime,
  numberReplace
}

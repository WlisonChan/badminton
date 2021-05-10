//index.js
const app = getApp()

Page({
  data: {
    dialog: {
      show: false,
      site: '',
      index: -1,
      time: ''
    },
    historyList: [{
        site: '2号场地',
        time: '2021-04-12 9:00~9:30 PM',
        cancel: false
      },
      {
        site: '3号场地',
        time: '2021-04-16 8:30~9:00 PM',
        cancel: false
      },
      {
        site: '1号场地',
        time: '2021-04-25 10:00~10:30 PM',
        cancel: false
      }
    ],
    bookList: [{
        site: '3号场地',
        time: '2021-05-12 9:00~9:30 PM',
        cancel: false
      },
      {
        site: '3号场地',
        time: '2021-05-13 8:30~9:00 PM',
        cancel: false
      },
      {
        site: '1号场地',
        time: '2021-05-14 10:00~10:30 PM',
        cancel: true
      },
      {
        site: '2号场地',
        time: '2021-05-15 9:00~9:30 PM',
        cancel: false
      }
    ]
  },

  onLoad: function () {

  },

  cancelBook(e) {
    console.log(e)
    this.setData({
      [`dialog.show`]: !this.data.dialog.show,
      [`dialog.site`]: e.currentTarget.dataset.site,
      [`dialog.index`]: e.currentTarget.dataset.index,
      [`dialog.time`]: e.currentTarget.dataset.time
    })
  },
  cancelConfirm() {
    let index = this.data.dialog.index
    this.setData({
      [`bookList[` + index + `].cancel`]: true
    })
    wx.lin.showMessage({
      content: '取消成功',
      type: 'success'
    })
    this.reSetDialog()
  },
  reSetDialog() {
    this.setData({
      [`dialog.show`]: false,
      [`dialog.site`]: '',
      [`dialog.index`]: -1,
      [`dialog.time`]: ''
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '羽毛球-个人信息',
      path: 'pages/index/index'
    }
  }
})
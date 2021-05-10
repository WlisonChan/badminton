// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ballMsg:{
      siteNum:0,
      booked:0,
      canBeBooked:0
    },
    showCalendar: false,
    currentDate: '2021-05-09',
    dialog: {
      show: false,
      index: '-1',
      subIndex: '-1',
      time: ''
    },
    curShow: {
      show: true
    },
    dataSite: [{
        name: '1号场地',
        show: true,
        isFull:false,
        book: [{
            time: '8:30~9:00 PM',
            isBook: false
          },
          {
            time: '9:00~9:30 PM',
            isBook: false
          },
          {
            time: '9:30~10:00 PM',
            isBook: true
          },
          {
            time: '10:00~10:30 PM',
            isBook: true
          }
        ]
      },
      {
        name: '2号场地',
        show: false,
        isFull:false,
        book: [{
            time: '8:30~9:00 PM',
            isBook: true
          },
          {
            time: '9:00~9:30 PM',
            isBook: false
          },
          {
            time: '9:30~10:00 PM',
            isBook: true
          },
          {
            time: '10:00~10:30 PM',
            isBook: false
          }
        ]
      },
      {
        name: '3号场地',
        show: false,
        isFull:true,
        book: [{
            time: '8:30~9:00 PM',
            isBook: false
          },
          {
            time: '9:00~9:30 PM',
            isBook: false
          },
          {
            time: '9:30~10:00 PM',
            isBook: false
          },
          {
            time: '10:00~10:30 PM',
            isBook: false
          }
        ]
      },
      {
        name: '4号场地',
        show: false,
        isFull:false,
        book: [{
            time: '8:30~9:00 PM',
            isBook: true
          },
          {
            time: '9:00~9:30 PM',
            isBook: true
          },
          {
            time: '9:30~10:00 PM',
            isBook: true
          },
          {
            time: '10:00~10:30 PM',
            isBook: true
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.formatDate(new Date())
    this.getBallMsg()
    let len = this.data.dataSite.length
    for(let i=0;i<len;i++){
      this.refreshFull(i)
    }
  },
  linselect(e) {
    this.formatDate(e.detail)
    this.setData({
      showCalendar: !this.data.showCalendar
    })
  },
  select(e) {
    let index = e.currentTarget.dataset.index

    this.setData({
      [`dataSite[` + index + `].show`]: !this.data.dataSite[index].show
    })
  },
  selectDate() {
    this.setData({
      showCalendar: !this.data.showCalendar
    })
  },
  showDialog(e) {
    this.setData({
      [`dialog.show`]: !this.data.dialog.show,
      [`dialog.index`]: e.currentTarget.dataset.index,
      [`dialog.subIndex`]: e.currentTarget.dataset.subindex,
      [`dialog.time`]: e.currentTarget.dataset.date
    })
  },
  book() {
    //预订逻辑
    let index = this.data.dialog.index
    let subIndex = this.data.dialog.subIndex

    this.setData({
      [`dataSite[` + index + `].book[` + subIndex + `].isBook`]: !this.data.dataSite[index].book[subIndex].isBook
    })
    wx.lin.showMessage({
      content: '预订成功',
      type:'success'
    })
    this.getBallMsg()
    this.reSetDialog()
    this.refreshFull(index)
  },
  reSetDialog() {
    this.setData({
      [`dialog.show`]: false,
      [`dialog.index`]: -1,
      [`dialog.subIndex`]: -1,
      [`dialog.time`]: ''
    })
  },
  getBallMsg(){
    let tempData = this.data.dataSite
    let sum = 0
    let booked = 0
    tempData.forEach(e=>{
      e.book.forEach(f=>{
        if(f.isBook){
          booked++
        }
        sum++
      })
    })
    this.setData({
      [`ballMsg.siteNum`]:tempData.length,
      [`ballMsg.booked`]:booked,
      [`ballMsg.canBeBooked`]:sum-booked
    })
  },
  refreshFull(index){
    let change = true
    let data = this.data.dataSite[index].book
    for(let i=0;i<data.length;i++){
      change = change && data[i].isBook
    }
    if(change){
      this.setData({
        [`dataSite[`+index+`].isFull`]:true
      })
    }else{
      this.setData({
        [`dataSite[`+index+`].isFull`]:false
      })
    }
  },
  formatDate(date) {
    let year = date.getYear() + 1900
    let month = date.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    this.setData({
      currentDate: year + '-' + month + '-' + day
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '羽毛球场地预订',
      path: 'pages/book/book'
    }
  }

})